import { Route } from '@angular/router';
import { BlankComponent } from './blank/blank.component';
export const EXTRA_PAGES_ROUTE: Route[] = [
  {
    path: 'blank',
    loadComponent: () =>
      import('./blank/blank.component').then((m) => m.BlankComponent),
  },
];
