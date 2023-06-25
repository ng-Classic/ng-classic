import {Directive} from '@angular-classic/core';

@Directive({
  selector: '[my-dir]',
  host: {'[attr.title]': '"my title"', '[tabindex]': '1', '[attr.id]': '"my-id"'}
})
export class MyDirective {
}
