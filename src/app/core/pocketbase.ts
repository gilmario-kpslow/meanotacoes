import { Injectable } from "@angular/core";
import PocketBase from "pocketbase";
import { from, of } from "rxjs";
import { environment } from "../../environments/environment";
import { USUARIOS } from "./constantes/colecoes";

@Injectable({ providedIn: "root" })
export class PocketbaseService {

    private client: PocketBase;

    constructor() {
        this.client = new PocketBase(environment.api);
    }

    login(req: any) {
        return from(this.client.collection(USUARIOS).authWithPassword(req.username, req.password));
    }


    listar(colecao: string) {
        return from(this.client.collection(colecao).getList());
    }

    getError(response: Response, data: any): any {
        console.log(response.status);
    }

    create(colecao: string, record: any) {
        return from(this.client.collection(colecao).create(record));
    }
}