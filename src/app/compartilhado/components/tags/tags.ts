import { Component, Input, OnInit, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-tags',
  imports: [MatChipsModule],
  templateUrl: './tags.html',
  styleUrl: './tags.css',
})
export class TagsComponent implements OnInit {

  @Input() tagsInfo: string = '';
  readonly tags = signal<string[]>([]);


  ngOnInit(): void {
    const part = this.tagsInfo.split(',');
    if (part.length > 0) {
      this.tags.update((value) => {
        return [...value, ...part];
      });
    }
  }

}
