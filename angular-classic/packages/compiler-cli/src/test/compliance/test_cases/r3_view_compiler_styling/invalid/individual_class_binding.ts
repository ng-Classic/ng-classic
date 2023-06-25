import {Component} from '@angular-classic/core';

@Component({template: '<div class.something="{{isEnabled}}"></div>'})
export class MyComponent {
  isEnabled = true;
}
