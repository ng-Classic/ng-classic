import {Component} from '@angular-classic/core';

@Component({
  template: `<div
   style.color="a{{one}}b"
   style.border="a{{one}}b"
   style.transition="a{{one}}b"></div>`
})
export class MyComponent {
  one = '';
}
