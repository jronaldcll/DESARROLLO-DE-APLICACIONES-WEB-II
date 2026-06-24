import { First3Component } from './first3/first3.component';
import { First2Component } from './first2/first2.component';
import { First1Component } from './first1/first1.component';
import { Route } from '@angular/router';

export const MULTILEVEL_ROUTE: Route[] = [
  {
    path: 'first1',
    component: First1Component,
  },
  {
    path: 'first2',
    component: First2Component,
  },
  {
    path: 'first3',
    component: First3Component,
  },
  {
    path: 'secondlevel',
    loadChildren: () =>
      import('./secondlevel/secondlevel.routes').then(
        (m) => m.SECONDLEVEL_ROUTE
      ),
  },
  {
    path: 'thirdlevel',
    loadChildren: () =>
      import('./thirdlevel/thirdlevel.routes').then((m) => m.THIRDLEVEL_ROUTE),
  },
];

