import { Routes } from '@angular/router';
import { SegurancaService } from './core/seguranca/seguranca.service';
import { HOME, LOGIN } from './core/constantes/routas';

export const routes: Routes = [
    {
        path: HOME, loadComponent: () => import('./paginas/home/home').then(a => a.Home), canActivate: [SegurancaService]
    },
    {
        path: LOGIN, loadComponent: () => import('./paginas/login/login').then(a => a.Login)
    },
];
