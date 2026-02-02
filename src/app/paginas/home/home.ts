import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { AnotacaoService } from '../../core/anotacoes/anotacao.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Novo } from '../../compartilhado/novo/novo';
import { MensagemService } from '../../compartilhado/components/mensagens/messagem.service';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { TagsComponent } from '../../compartilhado/components/tags/tags';
import { Excluir } from '../../compartilhado/excluir/excluir';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ListaResponse } from '../../core/models/lista-respone';
import { PaginadorDefault } from '../../compartilhado/implementacoes/paginador-defaults';
import { VerCard } from '../../compartilhado/ver-card/ver-card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SegurancaService } from '../../core/seguranca/seguranca.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Anotacao } from '../../core/models/anotacao';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatInputModule,
    MatChipsModule,
    TagsComponent,
    MatPaginatorModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
  providers: [AnotacaoService, { provide: MatPaginatorIntl, useClass: PaginadorDefault }],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  private readonly service = inject(AnotacaoService);
  listaResponse: ListaResponse<Anotacao> = {
    items: [],
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  };
  private readonly dialog = inject(MatDialog);
  private readonly mensagem = inject(MensagemService);
  private readonly seguranca = inject(SegurancaService);
  readonly keywords = signal([] as string[]);

  titulo = inject(FormBuilder).nonNullable.control('');

  @ViewChild('paginador') paginador?: MatPaginator;

  ngAfterViewInit(): void {
    this.listar();
    this.service.update.subscribe(() => {
      this.buscar();
    });

    this.titulo.valueChanges.subscribe((v) => {
      this.buscar();
    });
  }

  buscar() {
    if (this.paginador) {
      this.paginador.pageIndex = 0;
    }
    this.listar();
  }

  listar() {
    let tags = '';
    if (this.keywords().length > 0) {
      tags = this.keywords().reduce((a, b) => `${a},${b}`);
    }
    this.service
      .listar(
        (this.paginador?.pageIndex || 0) + 1,
        this.paginador?.pageSize,
        this.titulo.value,
        tags,
      )
      .subscribe((l) => {
        this.listaResponse = l;
      });
  }

  itens() {
    return this.listaResponse.items;
  }

  editar(registro: any) {
    this.dialog
      .open(Novo, {
        width: '500px',
        disableClose: true,
        data: registro,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.adicionarNovoItem(result);
        }
      });
  }

  ver(registro: any) {
    this.dialog.open(VerCard, {
      width: '500px',
      data: registro,
    });
  }

  adicionarNovoItem(result: any) {
    this.service.salvar(result).subscribe((resp) => {
      this.mensagem.sucesso('Registro salvo', 'OK', 'OK', () => {
        console.log('Fim');
      });
    });
  }

  excluir(record: any) {
    this.dialog
      .open(Excluir, {
        width: '500px',
        disableClose: true,
        data: {
          mensagem: `Excluir a anotação ${record.titulo}?`,
          titulo: 'Exluir registro?',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.service.excluir(record.id).subscribe(() => {
            this.mensagem.error('Registro excluído!', 'OK', 'OK', () => {
              console.log('Fim');
            });
          });
        }
      });
  }

  paginar(event: any) {
    this.listar();
  }

  novo() {
    this.dialog
      .open(Novo, {
        width: '500px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.adicionarNovoItem(result);
        }
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
    this.buscar();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.update((keywords) => {
        const tags = [...keywords, value];
        return [...keywords, value];
      });
    }
    this.buscar();
    event.chipInput!.clear();
  }

  proximo() {
    if (this.paginador && this.paginador.pageIndex < this.listaResponse.totalPages - 1) {
      this.paginador.pageIndex = this.paginador.pageIndex + 1;
      this.listar();
    }
  }

  voltar() {
    if (this.paginador && this.paginador.pageIndex > 0) {
      this.paginador.pageIndex = this.paginador.pageIndex - 1;
      this.listar();
    }
  }
}
