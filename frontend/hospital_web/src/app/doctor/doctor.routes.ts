import { Route } from '@angular/router';

export const DOCTOR_ROUTE: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../authentication/page404/page404.component').then(
        (m) => m.Page404Component,
      ),
  },
];
