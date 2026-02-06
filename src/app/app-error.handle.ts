import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SegurancaService } from './core/seguranca/seguranca.service';
import { MensagemService } from './compartilhado/components/mensagens/messagem.service';


@Injectable({ providedIn: 'root' })
export class AppErrorHandler extends ErrorHandler {

  router = inject(Router);
  notificador = inject(MensagemService);
  shared = inject(SegurancaService);
  constructor(private zone: NgZone) {

    super();
  }

  override handleError(errorResponse: HttpErrorResponse | any) {

    if (errorResponse instanceof HttpErrorResponse) {
      const error = errorResponse.error ? errorResponse.error : undefined;
      this.zone.run(() => {
        console.log('Error handle => ', error.mensagem)
        switch (errorResponse.status) {
          case 0:
            this.notificador.error('O Servidor não respondeu. A api parece indisponível no momento.');
            break;
          case 400:
            this.notificador.atencao(error.mensagem);

            break;
          case 401:
            this.router.navigate(['/auth']);
            this.notificador.error('Não autorizado', 'Erro', 'Usuário ou senha incorretos');
            // this.shared.logout();
            break;
          case 403:
            this.notificador.error("Usuário não está autorizado a acessar este recurso.");
            break;
          case 406:
            this.notificador.atencao(error.mensagem);
            break;
          case 500:
            this.notificador.error('Erro interno no servidor. Entre em contato com o suporte.');
            break;
          case 503:
            this.notificador.error('Erro interno no servidor. Entre em contato com o suporte.');
            break;
          default:
            this.notificador.error('Erro interno por favor, tente novamente mais tarde!');
            break;
        }
      });
    }
    super.handleError(errorResponse);
  }

}
