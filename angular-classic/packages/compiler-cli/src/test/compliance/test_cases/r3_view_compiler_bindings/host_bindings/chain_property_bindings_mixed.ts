import {Directive} from '@angular-classic/core';

@Directive({
  selector: '[my-dir]',
  host: {'[title]': '"my title"', '[attr.tabindex]': '1', '[id]': '"my-id"'}
})
export class MyDirective {
}
