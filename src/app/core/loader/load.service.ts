import { inject, Injectable, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Loader } from './loader/loader';

@Injectable({ providedIn: 'root' })
export class LoadService {
  private contador = 0;
  loading = signal(false);

  private readonly dialog = inject(MatDialog);
  ref: MatDialogRef<Loader> | undefined = undefined;

  show() {
    this.contador += 1;
    if (this.contador == 1) {
      // console.log('show');
      // this.mostrarLoader();
      this.loading.set(true);
    }
  }

  hide() {
    this.contador -= 1;
    if (this.contador <= 0) {
      // console.log('hide');
      // this.ocultarLoader();
      this.loading.set(false);
      this.contador = 0;
    }
  }

  // mostrarLoader() {
  //   // this.ref = this.dialog.open(Loader, {
  //   //   width: '10px',
  //   //   maxWidth: '50px',
  //   //   panelClass: 'spinner',
  //   //   hasBackdrop: false,
  //   // });
  // }

  // ocultarLoader() {
  //   if (this.ref) {
  //     //   this.ref.close();
  //   }
  // }
}
