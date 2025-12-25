import { AfterViewInit, Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { AnotacaoService } from '../../core/anotacoes/anotacao.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Novo } from '../../compartilhado/novo/novo';
import { MensagemService } from '../../compartilhado/components/mensagens/messagem.service';
import { MatChipsModule } from '@angular/material/chips';
import { TagsComponent } from '../../compartilhado/components/tags/tags';
import { Excluir } from '../../compartilhado/excluir/excluir';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ListaResponse } from '../../core/models/lista-respone';
import { PaginadorDefault } from '../../compartilhado/implementacoes/paginador-defaults';
import { VerCard } from '../../compartilhado/ver-card/ver-card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SegurancaService } from '../../core/seguranca/seguranca.service';

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
  ],
  providers: [AnotacaoService, { provide: MatPaginatorIntl, useClass: PaginadorDefault }],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  private readonly service = inject(AnotacaoService);
  listaResponse: ListaResponse<any> = {
    items: [],
    page: 0,
    perPage: 0,
    totalItems: 0,
    totalPages: 0,
  };
  private readonly dialog = inject(MatDialog);
  private readonly mensagem = inject(MensagemService);
  private readonly seguranca = inject(SegurancaService);

  @ViewChild('paginador') paginador?: MatPaginator;

  ngAfterViewInit(): void {
    this.listar();
    this.service.update.subscribe(() => {
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
    this.service
      .listar((this.paginador?.pageIndex || 0) + 1, this.paginador?.pageSize)
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
}
