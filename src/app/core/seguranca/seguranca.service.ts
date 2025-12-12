import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { RecordAuthResponse, RecordModel } from "pocketbase";
import { HOME, LOGIN } from "../constantes/routas";

@Injectable({ providedIn: 'root' })
export class SegurancaService implements CanActivate {

    auth: RecordAuthResponse<RecordModel> | undefined;
    private router = inject(Router);

    logar(record: RecordAuthResponse<RecordModel>) {
        this.auth = record;
        this.router.navigate(['/'])
    }

    isLogado(): boolean {
        return this.auth !== undefined;
    }

    canActivate(): boolean {
        if (this.isLogado()) {
            return true;
        }
        this.router.navigate(['/', LOGIN]);
        return false;
    }
}