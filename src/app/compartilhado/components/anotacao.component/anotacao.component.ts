import { Component, effect, inject, input, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TagsComponent } from '../tags/tags';
import { Anotacao } from '../../../core/models/anotacao';
import { AnotacaoPublica } from '../../../core/models/anotacao-publica';
import { MatDialog } from '@angular/material/dialog';
import { Novo } from '../../novo/novo';
import { VerCard } from '../../ver-card/ver-card';
import { Excluir } from '../../excluir/excluir';
import { MatButtonModule } from '@angular/material/button';
import { SegurancaService } from '../../../core/seguranca/seguranca.service';

@Component({
  selector: 'app-anotacao-component',
  imports: [MatCardModule, MatIconModule, TagsComponent, MatButtonModule],
  templateUrl: './anotacao.component.html',
  styleUrl: './anotacao.component.css',
})
export class AnotacaoComponent {
  readonly item = input.required<Anotacao | AnotacaoPublica>();
  private readonly seguranca = inject(SegurancaService);
  private readonly dialog = inject(MatDialog);

  logado = this.seguranca.logado;

  constructor() {
    effect(() => {

    });
  }

  editar() {
    this.dialog
      .open(Novo, {
        width: '500px',
        disableClose: true,
        data: this.item(),
      });
  }

  ver() {
    this.dialog.open(VerCard, {
      width: '500px',
      data: this.item(),
    });
  }

  excluir() {
    this.dialog
      .open(Excluir, {
        width: '500px',
        disableClose: true,
        data: {
          mensagem: `Excluir a anotação ${this.item()?.titulo}?`,
          titulo: 'Exluir registro?',
          record: this.item()
        },
      });
  }





}
