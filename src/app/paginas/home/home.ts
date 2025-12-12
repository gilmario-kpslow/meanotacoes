import { Component, inject, OnInit } from '@angular/core';
import { AnotacaoService } from '../../core/anotacoes/anotacao.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Novo } from '../../compartilhado/novo/novo';
import { MensagemService } from '../../compartilhado/components/mensagens/messagem.service';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { TagsComponent } from '../../compartilhado/components/tags/tags';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule, MatExpansionModule, MatInputModule, MatChipsModule, TagsComponent],
  providers: [AnotacaoService],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private service = inject(AnotacaoService);
  items: any[] = [];
  private dialog = inject(MatDialog);
  private mensagem = inject(MensagemService);

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe(l => {
      this.items = l.items;
    });
  }

  itens() {
    return this.items;
  }

  novo() {
    const dialogRef = this.dialog.open(Novo, {
      width: '500px', // Define uma largura para o modal
      disableClose: true // Impede fechar clicando fora
    });

    dialogRef.afterClosed().subscribe(result => {
      // 'result' contém os dados do formulário se o usuário salvou
      if (result) {
        console.log('Dados recebidos do modal:', result);
        this.adicionarNovoItem(result);
      }
    });
  }

  adicionarNovoItem(result: any) {
    this.service.salvar(result).subscribe((resp) => {
      console.log(resp);
      this.mensagem.atencao('Mteste', 'TESTE', 'Detalhe', () => {
        console.log('Fim');
      })
    })
  }
}
