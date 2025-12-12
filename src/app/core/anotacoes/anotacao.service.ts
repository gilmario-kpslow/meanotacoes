import { inject, Injectable } from "@angular/core"
import { PocketbaseService } from "../pocketbase"
import { ANOTACOES } from "../constantes/colecoes";
import { SegurancaService } from "../seguranca/seguranca.service";

@Injectable()
export class AnotacaoService {

    private pocketbase = inject(PocketbaseService);
    private seguranca = inject(SegurancaService);

    listar() {
        return this.pocketbase.listar(ANOTACOES);
    }

    salvar(anotacao: any) {
        anotacao.usuario = this.seguranca.auth?.record.id;
        return this.pocketbase.create(ANOTACOES, anotacao);
    }
}