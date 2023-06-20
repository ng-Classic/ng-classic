import {Directive, HostListener} from '@angular-classic/core';

@Directive({
  selector: '[my-dir]',
  host: {
    '(mousedown)': 'mousedown()',
    '(mouseup)': 'mouseup()',
  }
})
export class MyDirective {
  mousedown() {}
  mouseup() {}

  @HostListener('click')
  click() {
  }
}
