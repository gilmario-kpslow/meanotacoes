import { EventEmitter, inject, Injectable } from "@angular/core"
import { PocketbaseService } from "../pocketbase"
import { ANOTACOES } from "../constantes/colecoes";
import { SegurancaService } from "../seguranca/seguranca.service";

@Injectable()
export class AnotacaoService {

    private pocketbase = inject(PocketbaseService);
    private seguranca = inject(SegurancaService);
    update = new EventEmitter();

    constructor() {
        this.pocketbase.notificar(ANOTACOES, () => {
            this.update.emit();
        });
    }

    listar(page?: number, perPage?: number) {
        return this.pocketbase.listar(ANOTACOES, page, perPage);
    }



    salvar(anotacao: any) {
        if (anotacao.id) {
            return this.pocketbase.editar(ANOTACOES, anotacao);
        }
        anotacao.usuario = this.seguranca.getUsuario()?.record?.id;
        return this.pocketbase.create(ANOTACOES, anotacao);

    }

    editar(anotacao: any) {
        return this.pocketbase.editar(ANOTACOES, anotacao);
    }

    excluir(id: string) {
        return this.pocketbase.excluir(ANOTACOES, id);
    }

}