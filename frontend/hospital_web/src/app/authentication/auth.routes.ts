import { Route } from '@angular/router';

export const AUTH_ROUTE: Route[] = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./signin/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent,
      ),
  },
  {
    path: 'locked',
    loadComponent: () =>
      import('./locked/locked.component').then((m) => m.LockedComponent),
  },
  {
    path: 'page404',
    loadComponent: () =>
      import('./page404/page404.component').then((m) => m.Page404Component),
  },
  {
    path: 'page500',
    loadComponent: () =>
      import('./page500/page500.component').then((m) => m.Page500Component),
  },
  {
    path: 'two-factor',
    loadComponent: () =>
      import('./two-factor/two-factor.component').then(
        (m) => m.TwoFactorComponent,
      ),
  },
  {
    path: 'maintenance',
    loadComponent: () =>
      import('./maintenance/maintenance.component').then(
        (m) => m.MaintenanceComponent,
      ),
  },
  {
    path: 'coming-soon',
    loadComponent: () =>
      import('./coming-soon/coming-soon.component').then(
        (m) => m.ComingSoonComponent,
      ),
  },
];
