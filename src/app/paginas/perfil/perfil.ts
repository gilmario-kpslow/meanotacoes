import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SegurancaService } from '../../core/seguranca/seguranca.service';
import { UsuarioLogado } from '../../core/seguranca/usuario.logado';
import { UsuarioService } from '../../core/seguranca/usuario.service';
import { MensagemService } from '../../compartilhado/components/mensagens/messagem.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
  providers: [UsuarioService],
})
export class Perfil {
  private readonly segurancaService: SegurancaService = inject(SegurancaService);
  usuario?: UsuarioLogado = this.segurancaService.getUsuario();
  private readonly service: UsuarioService = inject(UsuarioService);
  private readonly mensagem = inject(MensagemService);
  nome = new FormControl(this.usuario?.record?.name);

  salvar() {
    this.service.salvar({ ...this.usuario?.record, name: this.nome.value }).subscribe((resp) => {
      this.mensagem.sucesso('Dados atualizados');
    });
  }
}
