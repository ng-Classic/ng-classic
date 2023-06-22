import {Component} from '@angular-classic/core';

@Component({
  template: `
    <button
      [attr.title]="1"
      [attr.id]="2"
      attr.tabindex="prefix-{{0 + 3}}"
      attr.aria-label="hello-{{1 + 3}}-{{2 + 3}}"></button>`
})
export class MyComponent {
}
