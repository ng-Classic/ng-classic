import {Component, HostListener} from '@angular-classic/core';

@Component({
  selector: 'my-comp',
  template: '',
  host: {
    '(mousedown)': 'mousedown()',
    '(@animation.done)': 'done()',
    '(mouseup)': 'mouseup()',
  }
})
export class MyComponent {
  @HostListener('@animation.start')
  start() {
  }

  @HostListener('click')
  click() {
  }
}
