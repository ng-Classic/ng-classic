import {Directive, HostListener} from '@angular-classic/core';

@Directive()
export class MyComponent {
  @HostListener('click', ['$event.target'])
  click(target: any) {
  }
}
