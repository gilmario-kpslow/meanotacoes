import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SegurancaService } from './seguranca.service';

@Injectable()
export class AuthGuard {
  constructor(private router: Router, private seguranca: SegurancaService) { }

  canActivate(): boolean {
    if (this.seguranca.logado()) {
      return true;
    }
    this.router.navigate(['/', 'login']);
    return false;
  }
}
