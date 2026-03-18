import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatOnlineService } from '../../core/chat/chatonline.service';
import { MatInputModule } from '@angular/material/input';
import { ChatOnlineView } from '../../core/models/chat-onlile-view';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-online',
  imports: [ReactiveFormsModule, MatInputModule, CommonModule, MatIconModule],
  templateUrl: './chat-online.html',
  styleUrl: './chat-online.css',
})
export class ChatOnline {

  private readonly service = inject(ChatOnlineService);
  lista = signal<ChatOnlineView[]>([]);


  mensagem = new FormControl();

  constructor() {
    this.service.update.subscribe((r) => {
      console.log(r);
      if (r.action == 'create') {
        this.listar();
      }
    });

    this.listar();
  }

  enviar() {
    this.mensagem.disable();
    this.service.salvar({ mensagem: this.mensagem.value }).subscribe(() => {
      this.mensagem.reset();
      this.mensagem.enable();
    });

  }

  listar() {
    this.service.listar().subscribe(l => {
      this.lista.set(l.items);
    })
  }

  remover(id: string) {
    this.lista.update((lista) => {
      lista = lista.filter(a => a.id !== id);
      return lista;
    })
    this.service.excluir(id).subscribe();
  }

  // mostrar(mensagem: string): string[] {
  //   let linhas = mensagem.split(/\r?\n/);
  //   return linhas;
  // }
}
