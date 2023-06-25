import {Component, HostListener} from '@angular-classic/core';

@Component({
  selector: 'my-comp',
  template: '',
  host: {
    '(@animation.done)': 'done()',
  }
})
export class MyComponent {
  @HostListener('@animation.start')
  start() {
  }
}
