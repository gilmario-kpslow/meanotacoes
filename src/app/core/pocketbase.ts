import { inject, Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { finalize, from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { USUARIOS } from './constantes/colecoes';
import { ListaResponse } from './models/lista-respone';
import { LoadService } from './loader/load.service';

@Injectable({ providedIn: 'root' })
export class PocketbaseService {
  private readonly client: PocketBase;
  private readonly loader = inject(LoadService);

  constructor() {
    this.client = new PocketBase(environment.api);
    this.client.autoCancellation(true);
    this.client.afterSend = (response, data) => {
      this.loader.hide();
      return data;
    };

    this.client.beforeSend = (url, options) => {
      this.loader.show();
      return { url, options };
    };

  }

  login(req: any) {
    try {
      return from(this.client.collection(USUARIOS)
        .authWithPassword(req.username, req.password))
        .pipe(finalize(() => this.loader.hide()));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  listar(
    colecao: string,
    page?: number,
    perPage?: number,
    filter?: string,
  ): Observable<ListaResponse<any>> {
    return from(this.client.collection(colecao).getList(page, perPage, { filter })).pipe(
      finalize(() => this.loader.hide()),
    );
  }

  getError(response: Response, data: any): any {
    console.log('ERROR => ', response.status);
  }

  create(colecao: string, record: any) {
    return from(this.client.collection(colecao).create(record)).pipe(
      finalize(() => this.loader.hide()),
    );
  }

  notificar(colecao: string, fn: (e: any) => void) {
    return from(this.client.collection(colecao).subscribe('*', fn)).pipe(
      finalize(() => this.loader.hide()),
    );
  }

  authStore() {
    return this.client.authStore;
  }

  editar(colecao: string, record: any) {
    return from(this.client.collection(colecao).update(record.id, record)).pipe(
      finalize(() => this.loader.hide()),
    );
  }

  excluir(colecao: string, id: string) {
    return from(this.client.collection(colecao).delete(id)).pipe(
      finalize(() => this.loader.hide()),
    );
  }
}
