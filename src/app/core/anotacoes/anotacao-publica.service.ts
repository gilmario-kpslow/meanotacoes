import { EventEmitter, inject, Injectable } from '@angular/core';
import { PocketbaseService } from '../pocketbase';
import { ANOTACOES_PUBLICAS } from '../constantes/colecoes';
import { Observable } from 'rxjs';
import { ListaResponse } from '../models/lista-respone';
import { AnotacaoPublica } from '../models/anotacao-publica';

@Injectable()
export class AnotacaoPublicaService {
  private pocketbase = inject(PocketbaseService);
  update = new EventEmitter();

  constructor() {
    // this.pocketbase.notificar(ANOTACOES_PUBLICAS, () => {
    //   this.update.emit();
    // });
  }

  listar(page?: number, perPage?: number, titulo: string = '', tag: string = '') {
    return this.pocketbase.listar(
      ANOTACOES_PUBLICAS,
      page,
      perPage,
      `titulo~"${titulo}"&&tag~"${tag}"`,
    ) as Observable<ListaResponse<AnotacaoPublica>>;
  }
}
