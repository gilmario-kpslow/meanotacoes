import { inject, Injectable } from '@angular/core';
import { PocketbaseService } from '../pocketbase';

@Injectable()
export class UsuarioService {
  pocketabe: PocketbaseService = inject(PocketbaseService);

  salvar(usuario: any) {
    return this.pocketabe.editar('users', usuario);
  }
}
