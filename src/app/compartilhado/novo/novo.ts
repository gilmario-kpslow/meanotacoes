import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  templateUrl: './novo.html',
  styleUrl: './novo.css',
})
export class Novo {

  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<Novo>);
  cadastroForm: FormGroup;
  readonly keywords = signal([] as string[]);


  constructor() {
    this.cadastroForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      tag: ['']
    });
  }

  onCancelar(): void {
    this.dialogRef.close();
  }

  onSalvar(): void {
    if (this.cadastroForm.valid) {
      this.dialogRef.close(this.cadastroForm.value);
    }
  }

  removeKeyword(keyword: string) {
    this.cadastroForm.get('tag')?.setValue(``);
    this.keywords.update(keywords => {
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
      this.keywords.update(keywords => {
        const tags = [...keywords, value];
        this.cadastroForm.get('tag')?.setValue(tags.reduce((a, b) => `${a},${b}`));
        return [...keywords, value];
      });
    }

    event.chipInput!.clear();
  }
}
