import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@feature/dashboard/dashboard.routes').then((r) => r.dashboardRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('@core/feature/auth/auth.routes').then((r) => r.authRoutes),
  },
];
