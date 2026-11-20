import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./router/').then((r) => r.DashboardRouter),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },

      {
        path: 'home',
        loadComponent: () => import('./page/').then((r) => r.DashboardDefaultPage),
      },
    ],
  },
];
