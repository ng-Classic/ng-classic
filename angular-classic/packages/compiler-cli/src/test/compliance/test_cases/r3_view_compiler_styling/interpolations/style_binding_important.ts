import {Component} from '@angular-classic/core';

@Component({
  template: `
    <div style.width!important="a{{one}}b{{two}}c"></div>
  `
})
export class MyComponent {
  one = '';
  two = '';
}
