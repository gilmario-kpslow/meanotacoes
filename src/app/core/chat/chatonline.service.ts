import { EventEmitter, inject, Injectable } from "@angular/core";
import { PocketbaseService } from "../pocketbase";
import { SegurancaService } from "../seguranca/seguranca.service";
import { CHAT_ONLINE, CHAT_ONLINE_VIEW } from "../constantes/colecoes";
import { Observable } from "rxjs";
import { ListaResponse } from "../models/lista-respone";
import { ChatOnlineView } from "../models/chat-onlile-view";

@Injectable({ providedIn: 'root' })
export class ChatOnlineService {

    private pocketbase = inject(PocketbaseService);
    private seguranca = inject(SegurancaService);
    update = new EventEmitter();

    constructor() {
        this.pocketbase.notificar(CHAT_ONLINE, (e) => {
            this.update.emit(e);
        });
    }

    listar() {
        return this.pocketbase.listar(
            CHAT_ONLINE_VIEW,
            0,
            1000,
            '',
        ) as Observable<ListaResponse<ChatOnlineView>>;
    }

    salvar(entity: any) {
        entity.usuario = this.seguranca.getUsuario()?.record?.id;
        return this.pocketbase.create(CHAT_ONLINE, entity);
    }

    excluir(id: string) {
        return this.pocketbase.excluir(CHAT_ONLINE, id);
    }
}