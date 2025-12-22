import { Component, computed, input, Input, OnInit, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-tags',
  imports: [MatChipsModule],
  templateUrl: './tags.html',
  styleUrl: './tags.css',
})
export class TagsComponent {

  readonly tagsInfo = input<string>();
  readonly tags = computed(() => {
    const part = this.tagsInfo()?.split(',') || '';
    if (part.length > 0) {
      return part;
    }
    return [];
  });
}
