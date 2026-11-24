import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./router/').then((r) => r.AuthRouter),
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },

      {
        path: 'sign-in',
        loadComponent: () => import('./page/').then((r) => r.SignInPage),
      },

      {
        path: 'sign-up',
        loadComponent: () => import('./page/').then((r) => r.SignUpPage),
      },

      {
        path: 'me/:name/:firstname',
        loadComponent: () => import('./page/').then((r) => r.MePage),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./page/').then((r) => r.FallbackPage),
  },
];
