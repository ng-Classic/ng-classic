// #docregion
import { Directive, ElementRef } from '@angular-classic/core';

// eslint-disable-next-line @angular-classic-eslint/directive-selector
@Directive({ selector: 'input'})
/** Highlight the attached input text element in blue */
export class InputHighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'powderblue';
  }
}
