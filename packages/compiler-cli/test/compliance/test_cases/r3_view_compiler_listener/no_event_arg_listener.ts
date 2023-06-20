import {Component} from '@angular-classic/core';

@Component({template: `<div (click)="onClick();"></div>`})
export class MyComponent {
  onClick() {}
}
