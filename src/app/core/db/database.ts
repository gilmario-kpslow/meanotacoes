import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { map, switchMap } from 'rxjs';

export class DBSession<T> {
  protected readonly dbService: NgxIndexedDBService = inject(NgxIndexedDBService);

  constructor(private table: string) {}

  deleteDB() {
    return this.dbService.deleteDatabase();
  }

  save(lista: any[]) {
    return this.dbService.bulkAdd(this.table, lista);
  }

  update(registro: any) {
    return this.dbService.add(this.table, registro);
  }

  getEntity(id: number) {
    return this.dbService.getByID(this.table, id);
  }

  listEntites() {
    return this.dbService.getAll<T>(this.table);
  }

  removerAll() {
    return this.dbService.clear(this.table);
  }

  findByEquals(campo: string, valor: string) {
    return this.dbService.getAllByIndex<T>(this.table, campo, IDBKeyRange.only(valor));
  }

  findById(id: string) {
    return this.dbService.getByID<T>(this.table, id);
  }

  // page(pagina: number, totalPorPagina: number, campo: string, valor: string) {
  //   return this.dbService.count(this.table).pipe(switchMap(total => {
  //     const lista: T[] = [];

  //     return this.dbService.openCursorByIndex(this.table, 'id', IDBKeyRange.bound(pagina, totalPorPagina)).pipe(map((evt) => {
  //       const request = evt.target as IDBRequest
  //       const cursor = request.result as IDBCursorWithValue;

  //       if (!cursor) {
  //         return lista;
  //       }
  //       if(pageNumber > 0) {
  //         cursor.advance(pageSize * pageNumber);
  //       }

  //       lista.push(cursor.value);
  //       if(lista.length >= pageSize) {
  //         return lista;
  //       }
  //       cursor.continue();

  //       return lista;
  //     }));
  //   }));
  // }
}
