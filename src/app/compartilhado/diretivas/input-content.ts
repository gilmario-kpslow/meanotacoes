import { Directive, ElementRef, Optional, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputContent]',
  standalone: true
})
export class InputContent {

  constructor(renderer: Renderer2, @Optional() el: ElementRef) {
    if (!el || !el.nativeElement) {
      return;
    }

    renderer.addClass(el.nativeElement, 'input-class');

    const c = renderer.createElement('div');
    c.innerHTML = 'OK';
    renderer.appendChild(el.nativeElement, c);
    // renderer.insertBefore(el.nativeElement, c, undefined);

  }

}
