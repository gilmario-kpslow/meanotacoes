import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { RecordAuthResponse, RecordModel } from "pocketbase";
import { HOME, LOGIN } from "../constantes/routas";
import { UsuarioLogado } from "./usuario.logado";
import { PocketbaseService } from "../pocketbase";

@Injectable({ providedIn: 'root' })
export class SegurancaService {

    private usuario?: UsuarioLogado;
    private readonly router = inject(Router);
    private readonly pocketbase = inject(PocketbaseService);

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
        this.router.navigate(['/']);
    }

    logout() {
        this.usuario = undefined;
        this.router.navigate(['/', LOGIN]);
        this.pocketbase.authStore().clear();
    }

    get logado() {
        return this.usuario != undefined && this.tokenValido();
    }

    tokenValido(): boolean {
        return this.pocketbase.authStore().isValid;
    }

    getUsuario() {
        return this.usuario;
    }
}