import { inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { LOGIN } from "../constantes/routas";
import { UsuarioLogado } from "./usuario.logado";
import { PocketbaseService } from "../pocketbase";

@Injectable({ providedIn: 'root' })
export class SegurancaService {

    private usuario?: UsuarioLogado;
    private readonly router = inject(Router);
    private readonly pocketbase = inject(PocketbaseService);
    logado = signal(false);

    constructor() {
        if (this.tokenValido()) {
            this.usuario = {
                record: this.pocketbase.authStore().record,
                token: this.pocketbase.authStore().token,
            };
        }
    }

    logar(user: UsuarioLogado) {
        this.usuario = user;

        this.logado.set(true);

        this.router.navigate(['/']);
    }

    logout() {
        this.logado.set(false);
        this.usuario = undefined;
        this.pocketbase.authStore().clear();
        this.router.navigate(['/']);
    }



    tokenValido(): boolean {
        return this.pocketbase.authStore().isValid;
    }

    getUsuario() {
        return this.usuario;
    }
}