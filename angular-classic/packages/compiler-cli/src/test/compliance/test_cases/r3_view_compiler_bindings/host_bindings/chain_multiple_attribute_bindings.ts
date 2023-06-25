import {Directive} from '@angular-classic/core';

@Directive({
  selector: '[my-dir]',
  host: {'[attr.title]': 'myTitle', '[attr.tabindex]': '1', '[attr.id]': 'myId'}
})
export class MyDirective {
  myTitle = 'hello';
  myId = 'special-directive';
}
