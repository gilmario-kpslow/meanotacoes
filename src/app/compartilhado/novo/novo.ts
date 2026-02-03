import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { AnotacaoService } from '../../core/anotacoes/anotacao.service';
import { MensagemService } from '../components/mensagens/messagem.service';

@Component({
  selector: 'app-novo',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    CommonModule,
  ],
  providers: [AnotacaoService],
  templateUrl: './novo.html',
  styleUrl: './novo.css',
})
export class Novo implements OnInit {
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<Novo>);
  readonly keywords = signal([] as string[]);
  private readonly data = inject<any>(MAT_DIALOG_DATA);
  private readonly service = inject(AnotacaoService);
  private readonly mensagem = inject(MensagemService);

  cadastroForm = this.fb.group({
    id: [],
    titulo: ['', Validators.required],
    descricao: [''],
    tag: [''],
  });

  ngOnInit(): void {
    if (this.data) {
      this.cadastroForm.patchValue(this.data);
      this.setTags(this.data.tag);
    }
  }

  onCancelar(): void {
    this.dialogRef.close();
  }

  onSalvar(): void {
    if (this.cadastroForm.valid) {
      this.service.salvar(this.cadastroForm.value).subscribe((resp) => {
        this.dialogRef.close(resp);
        this.mensagem.sucesso('Registro salvo', 'OK', 'OK');
      });
    }
  }

  removeKeyword(keyword: string) {
    this.cadastroForm.get('tag')?.setValue(``);
    this.keywords.update((keywords) => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }
      keywords.splice(index, 1);

      this.cadastroForm.get('tag')?.setValue(keywords.reduce((a, b) => `${a},${b}`));
      return [...keywords];
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.update((keywords) => {
        const tags = [...keywords, value];
        this.cadastroForm.get('tag')?.setValue(tags.reduce((a, b) => `${a},${b}`));
        return [...keywords, value];
      });
    }

    event.chipInput!.clear();
  }

  setTags(tag?: string) {
    if (!tag) {
      return;
    }
    const tags = tag.split(',');
    this.keywords.set(tags);
  }
}
