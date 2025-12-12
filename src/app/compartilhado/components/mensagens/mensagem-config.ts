import { Mensagem } from './mensagem';
export interface MensagemConfig {

  mensagem: Mensagem;
  tipo: 'info'|'warn'|'error'|'success';
}
