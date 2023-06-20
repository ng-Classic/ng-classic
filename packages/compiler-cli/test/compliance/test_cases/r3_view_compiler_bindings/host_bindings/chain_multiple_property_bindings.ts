import {Directive} from '@angular-classic/core';

@Directive({selector: '[my-dir]', host: {'[title]': 'myTitle', '[tabindex]': '1', '[id]': 'myId'}})
export class MyDirective {
  myTitle = 'hello';
  myId = 'special-directive';
}
