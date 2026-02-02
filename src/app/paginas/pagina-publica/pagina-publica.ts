import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { AnotacaoPublicaService } from '../../core/anotacoes/anotacao-publica.service';
import { ListaResponse } from '../../core/models/lista-respone';
import { AnotacaoPublica } from '../../core/models/anotacao-publica';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TagsComponent } from '../../compartilhado/components/tags/tags';

@Component({
  selector: 'app-pagina-publica',
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    TagsComponent,
  ],
  templateUrl: './pagina-publica.html',
  styleUrl: './pagina-publica.css',
})
export class PaginaPublica implements OnInit {
  private readonly service = inject(AnotacaoPublicaService);
  titulo = inject(FormBuilder).nonNullable.control('');
  readonly keywords = signal([] as string[]);
  @ViewChild('paginador') paginador?: MatPaginator;

  listaResponse: WritableSignal<ListaResponse<AnotacaoPublica>> = signal({
    items: [],
    page: 1,
    perPage: 16,
    totalItems: 0,
    totalPages: 1,
  });

  ngOnInit(): void {
    this.service.listar().subscribe((response) => {
      this.listaResponse.set(response);
    });
  }

  removeKeyword(keyword: string) {
    this.keywords.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }
      keywords.splice(index, 1);

      return [...keywords];
    });
    // this.buscar();
  }
}
