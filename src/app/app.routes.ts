import { Routes } from '@angular/router';
import { HOME, LOGIN, PERFIL } from './core/constantes/routas';
import { AuthGuard } from './core/seguranca/auth.guard';

export const routes: Routes = [
  {
    path: HOME,
    loadComponent: () => import('./paginas/layout/layout').then((a) => a.Layout),
    canActivate: [AuthGuard],
    children: [
      {
        path: HOME,
        loadComponent: () => import('./paginas/home/home').then((a) => a.Home),
        canActivate: [AuthGuard],
      },
      {
        path: PERFIL,
        loadComponent: () => import('./paginas/perfil/perfil').then((a) => a.Perfil),
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: LOGIN,
    loadComponent: () => import('./paginas/login/login').then((a) => a.Login),
  },
];
