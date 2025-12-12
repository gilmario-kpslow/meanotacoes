import { Injectable, inject } from '@angular/core';

import { Mensagem } from './mensagem';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })
export class MensagemService {

  private _snackBar = inject(MatSnackBar);
  constructor() { }

  informacao(mensagem: string, titulo: string, detalhe: string = '', fn?: Function) {
    this.open({ detalhe, titulo, icone: 'info', mensagem }, 'info', fn);
  }

  sucesso(mensagem: string, titulo: string = 'Sucesso!', detalhe: string = '', fn?: Function) {
    this.open({ detalhe, titulo, icone: 'check_circle', mensagem }, 'success', fn);
  }

  atencao(mensagem: string, titulo: string = 'Atenção!', detalhe: string = '', fn?: Function) {
    this.open({ detalhe, titulo, icone: 'report_problem', mensagem }, 'warn', fn);
  }

  error(mensagem: string, titulo: string = 'Erro', detalhe: string = '', fn?: Function) {
    this.open({ detalhe, titulo, icone: 'report_gmailerrorred', mensagem }, 'error', fn);
  }

  open(mensagem: Mensagem, tipo: string, fn?: Function) {
    this._snackBar.open(mensagem.titulo, mensagem.detalhe, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
