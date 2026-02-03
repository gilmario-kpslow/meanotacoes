import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Novo } from '../../compartilhado/novo/novo';
import { AnotacaoService } from '../../core/anotacoes/anotacao.service';
import { SegurancaService } from '../../core/seguranca/seguranca.service';
import { MensagemService } from '../../compartilhado/components/mensagens/messagem.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  providers: [AnotacaoService],
})
export class Layout {
  private readonly dialog = inject(MatDialog);
  private readonly service = inject(AnotacaoService);
  private readonly mensagem = inject(MensagemService);
  private readonly seguranca = inject(SegurancaService);

  logado = this.seguranca.logado;

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

  logout() {
    this.seguranca.logout();
  }

  adicionarNovoItem(result: any) {
    this.service.salvar(result).subscribe((resp) => {
      this.mensagem.sucesso('Registro salvo', 'OK', 'OK', () => { });
    });
  }

  buscar() { }
}
