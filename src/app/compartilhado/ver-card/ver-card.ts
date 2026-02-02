import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TagsComponent } from '../components/tags/tags';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ver-card',
  imports: [MatDialogModule, MatButtonModule, CommonModule, TagsComponent, MatIconModule],
  templateUrl: './ver-card.html',
  styleUrl: './ver-card.css',
})
export class VerCard {
  readonly data = inject<any>(MAT_DIALOG_DATA);
}
