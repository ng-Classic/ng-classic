import {Component} from '@angular-classic/core';

@Component({
  template: `
    <button attr.title="{{myTitle}}" attr.id="{{buttonId}}" attr.tabindex="{{1}}"></button>
  `
})
export class MyComponent {
  myTitle = 'hello';
  buttonId = 'special-button';
}
