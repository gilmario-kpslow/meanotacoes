import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { from } from 'rxjs';
import { environment } from '../../environments/environment';
import { USUARIOS } from './constantes/colecoes';

@Injectable({ providedIn: 'root' })
export class PocketbaseService {
  private readonly client: PocketBase;

  constructor() {
    this.client = new PocketBase(environment.api);
  }

  login(req: any) {
    return from(this.client.collection(USUARIOS).authWithPassword(req.username, req.password));
  }

  listar(colecao: string, page?: number, perPage?: number, filter?: string) {
    return from(this.client.collection(colecao).getList(page, perPage, { filter }));
  }

  getError(response: Response, data: any): any {
    console.log(response.status);
  }

  create(colecao: string, record: any) {
    return from(this.client.collection(colecao).create(record));
  }

  notificar(colecao: string, fn: (e: any) => void) {
    return from(this.client.collection(colecao).subscribe('*', fn));
  }

  authStore() {
    return this.client.authStore;
  }

  editar(colecao: string, record: any) {
    return from(this.client.collection(colecao).update(record.id, record));
  }

  excluir(colecao: string, id: string) {
    return from(this.client.collection(colecao).delete(id));
  }
}
