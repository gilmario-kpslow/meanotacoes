import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AnotacaoService } from '../../core/anotacoes/anotacao.service';
import { MensagemService } from '../components/mensagens/messagem.service';

@Component({
  selector: 'app-excluir',
  imports: [MatDialogModule, MatButtonModule],
  providers: [AnotacaoService],
  templateUrl: './excluir.html',
  styleUrl: './excluir.css',
})
export class Excluir {

  private readonly service = inject(AnotacaoService);
  readonly ref = inject(MatDialogRef<Excluir>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  private readonly mensagem = inject(MensagemService);

  confirmar() {
    this.service.excluir(this.data.record.id).subscribe(() => {
      this.mensagem.error('Registro excluído!', 'OK', 'OK');
      this.ref.close(true);
    });
  }
}
