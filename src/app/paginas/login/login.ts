import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from './login.service';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { InputContent } from '../../compartilhado/diretivas/input-content';
import { SegurancaService } from '../../core/seguranca/seguranca.service';
import { PocketbaseService } from '../../core/pocketbase';
import { environment } from '../../../environments/environment';
import { CriptoService } from '../../core/seguranca/cripto.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputContent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [LoginService],
})
export class Login {
  form: FormGroup;

  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);

  fb: FormBuilder = inject(FormBuilder);
  segurancaService: SegurancaService = inject(SegurancaService);

  // criptoService = inject(CriptoService);

  constructor() {
    this.form = this.fb.group({
      username: this.fb.nonNullable.control(environment.usuario, [Validators.required]),
      password: this.fb.nonNullable.control(environment.senha, [Validators.required]),
    });

    if (this.segurancaService.logado) {
      this.router.navigate(['/']);
    }
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loginService.login(this.form.value).subscribe((resp) => {
      this.segurancaService.logar(resp);
    });
  }

  // async testeCripto() {
  //   // this.criptoService.exemplo();
  //   this.criptoService.criptografar('texte Exemplo', '123456').then((resp) => {
  //     console.log(resp);
  //   });
  // }

  // async testeCripto2() {
  //   this.criptoService.exemplo2();
  // }
}
