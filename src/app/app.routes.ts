import { Routes } from '@angular/router';
import { SegurancaService } from './core/seguranca/seguranca.service';
import { HOME, LOGIN } from './core/constantes/routas';
import { AuthGuard } from './core/seguranca/auth.guard';

export const routes: Routes = [
    {
        path: HOME, loadComponent: () => import('./paginas/home/home').then(a => a.Home), canActivate: [AuthGuard]
    },
    {
        path: LOGIN, loadComponent: () => import('./paginas/login/login').then(a => a.Login)
    },
];
