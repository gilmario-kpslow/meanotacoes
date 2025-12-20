import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable()
export class PaginadorDefault implements MatPaginatorIntl {

    changes = new Subject<void>();

    firstPageLabel = `Primeira página`;
    itemsPerPageLabel = `Items por página:`;
    lastPageLabel = `Ultima página`;

    // You can set labels to an arbitrary string too, or dynamically compute
    // it through other third-party internationalization libraries.
    nextPageLabel = 'Próxima página';
    previousPageLabel = 'Previous página';

    getRangeLabel(page: number, pageSize: number, length: number): string {
        if (length === 0) {
            return `página 1 of 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return `Página ${page + 1} de ${amountPages}`;
    }
}