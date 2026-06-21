#!/usr/bin/env bash

set -euo pipefail

VERSION="${1:-1.0}"
MODE="${2:-local}"

APP_NAME="resilia-demo"
ARGOCD_URL="${ARGOCD_URL:-localhost:8080}"
ARGOCD_USER="${ARGOCD_USER:-admin}"
NAMESPACE="${NAMESPACE:-default}"

INVENTARIO_IMAGE="ms-inventario:${VERSION}"
PEDIDOS_IMAGE="ms-pedidos:${VERSION}"

info() {
  printf '\n==> %s\n' "$1"
}

fail() {
  printf '\nERROR: %s\n' "$1" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "No se encontro el comando requerido: $1"
}

repo_url_for_argocd() {
  local remote
  remote="$(git remote get-url origin 2>/dev/null || true)"
  [ -n "$remote" ] || fail "No existe remote origin. Crea/configura el repo antes de usar modo gitops."

  if [[ "$remote" =~ ^git@github.com:(.+)$ ]]; then
    printf 'https://github.com/%s\n' "${BASH_REMATCH[1]}"
  else
    printf '%s\n' "$remote"
  fi
}

ensure_gitops_sources_are_published() {
  local app_path="$1"

  git ls-tree -d HEAD "$app_path" >/dev/null 2>&1 || fail "${app_path}/ no existe en el ultimo commit local. Ejecuta modo local o publica los manifests antes de usar gitops."

  if ! git diff --quiet -- k8s ms-inventario/Dockerfile ms-pedidos/Dockerfile deploy.sh; then
    fail "Hay cambios sin commit en archivos de despliegue. ArgoCD no puede verlos hasta que los publiques en Git."
  fi

  if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
    local local_head upstream_head
    local_head="$(git rev-parse HEAD)"
    upstream_head="$(git rev-parse '@{u}')"
    [ "$local_head" = "$upstream_head" ] || fail "Tu rama local no esta alineada con el upstream. Haz push antes de usar modo gitops."
  else
    printf 'Aviso: la rama actual no tiene upstream configurado; no puedo validar si GitHub esta actualizado.\n'
  fi
}

update_manifest_image() {
  local file="$1"
  local image="$2"
  local escaped_image

  escaped_image="$(printf '%s' "$image" | sed 's/[&/\]/\\&/g')"
  sed -i.bak "s|image: .*|image: ${escaped_image}|g" "$file"
  rm -f "${file}.bak"
}

wait_for_url_file() {
  local file="$1"
  local retries=30

  while [ "$retries" -gt 0 ]; do
    if [ -s "$file" ]; then
      head -n 1 "$file"
      return 0
    fi
    retries=$((retries - 1))
    sleep 1
  done

  return 1
}

show_access_urls() {
  local inv_file ped_file inv_pid ped_pid inv_url ped_url

  inv_file="$(mktemp)"
  ped_file="$(mktemp)"

  minikube service ms-inventario-svc --url >"$inv_file" 2>/dev/null &
  inv_pid="$!"
  minikube service ms-pedidos-svc --url >"$ped_file" 2>/dev/null &
  ped_pid="$!"

  inv_url="$(wait_for_url_file "$inv_file" || true)"
  ped_url="$(wait_for_url_file "$ped_file" || true)"

  rm -f "$inv_file" "$ped_file"

  [ -n "$inv_url" ] || fail "No se pudo obtener URL de ms-inventario-svc"
  [ -n "$ped_url" ] || fail "No se pudo obtener URL de ms-pedidos-svc"

  printf '\nURLs de acceso:\n'
  printf '  ms-inventario: %s\n' "$inv_url"
  printf '  ms-pedidos:    %s\n' "$ped_url"

  printf '\nRutas utiles para la demo:\n'
  printf '  Inventario health:       %s/actuator/health\n' "$inv_url"
  printf '  Inventario stock:        %s/inventario/1\n' "$inv_url"
  printf '  Inventario estado demo:  %s/inventario/demo/estado\n' "$inv_url"
  printf '  Pedidos health:          %s/actuator/health\n' "$ped_url"
  printf '  Pedidos con resiliencia: %s/pedidos/con-resiliencia\n' "$ped_url"
  printf '  Pedidos sin resiliencia: %s/pedidos/sin-resiliencia\n' "$ped_url"

  printf '\nHealth checks:\n'
  curl -fsS "${inv_url}/actuator/health" && printf '\n'
  curl -fsS "${ped_url}/actuator/health" && printf '\n'

  printf '\nLos tuneles de Minikube estan activos mientras este script siga abierto.\n'
  printf 'Presiona Ctrl+C para terminar la demo y cerrar los tuneles.\n'

  trap 'kill "$inv_pid" "$ped_pid" >/dev/null 2>&1 || true' EXIT INT TERM
  wait "$inv_pid" "$ped_pid"
}

if [ "$MODE" != "gitops" ] && [ "$MODE" != "local" ]; then
  fail "Modo invalido: $MODE. Usa: ./deploy.sh [version] [gitops|local]"
fi

require_cmd docker
require_cmd minikube
require_cmd kubectl
require_cmd curl

info "Deploy resilia-demo version ${VERSION} (${MODE})"

info "Apuntando Docker al daemon de Minikube"
eval "$(minikube docker-env)"

info "Construyendo imagen ${INVENTARIO_IMAGE}"
docker build -t "$INVENTARIO_IMAGE" ./ms-inventario

info "Construyendo imagen ${PEDIDOS_IMAGE}"
docker build -t "$PEDIDOS_IMAGE" ./ms-pedidos

info "Imagenes disponibles en Minikube"
docker images | grep -E 'ms-inventario|ms-pedidos' || true

info "Actualizando manifests a version ${VERSION}"
update_manifest_image "k8s/ms-inventario-deployment.yaml" "$INVENTARIO_IMAGE"
update_manifest_image "k8s/ms-pedidos-deployment.yaml" "$PEDIDOS_IMAGE"

if [ "$MODE" = "local" ]; then
  info "Aplicando manifests directamente con kubectl"
  kubectl apply -f k8s/
else
  require_cmd git
  require_cmd argocd

  APP_PATH="${APP_PATH:-$(git rev-parse --show-prefix)k8s}"

  ensure_gitops_sources_are_published "$APP_PATH"
  REPO_URL="$(repo_url_for_argocd)"

  info "Validando repo Git para ArgoCD"
  printf 'Repo ArgoCD: %s\n' "$REPO_URL"
  printf 'Path ArgoCD: %s\n' "$APP_PATH"
  printf 'Nota: este script no hace commit ni push. ArgoCD solo vera cambios que ya esten publicados en Git.\n'

  info "Autenticando en ArgoCD"
  ARGOCD_PASS="${ARGOCD_PASS:-$(kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath='{.data.password}' | base64 -d)}"
  argocd login "$ARGOCD_URL" --username "$ARGOCD_USER" --password "$ARGOCD_PASS" --insecure

  info "Creando o actualizando app ${APP_NAME} en ArgoCD"
  argocd app create "$APP_NAME" \
    --repo "$REPO_URL" \
    --path "$APP_PATH" \
    --dest-server https://kubernetes.default.svc \
    --dest-namespace "$NAMESPACE" \
    --sync-policy automated \
    --self-heal \
    --auto-prune \
    --upsert

  argocd app sync "$APP_NAME"
  argocd app wait "$APP_NAME" --health --sync --timeout 180
fi

info "Esperando rollouts"
kubectl rollout status deployment/ms-inventario -n "$NAMESPACE" --timeout=120s
kubectl rollout status deployment/ms-pedidos -n "$NAMESPACE" --timeout=120s

info "Estado del cluster"
kubectl get pods -n "$NAMESPACE"
printf '\n'
kubectl get services -n "$NAMESPACE"

show_access_urls
