import { Component, signal, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TagsComponent } from '../tags/tags';
import { Anotacao } from '../../../core/models/anotacao';
import { AnotacaoPublica } from '../../../core/models/anotacao-publica';

@Component({
  selector: 'app-anotacao.component',
  imports: [MatCardModule, MatIconModule, TagsComponent],
  templateUrl: './anotacao.component.html',
  styleUrl: './anotacao.component.css',
})
export class AnotacaoComponent {
  item: WritableSignal<Anotacao | AnotacaoPublica | undefined> = signal(undefined);
}
