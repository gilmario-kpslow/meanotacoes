import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './excluir.html',
  styleUrl: './excluir.css',
})
export class Excluir {

  readonly ref = inject(MatDialogRef<Excluir>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  confirmar() {
    this.ref.close(true);
  }
}
