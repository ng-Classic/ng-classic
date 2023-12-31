import {Directive} from '@angular-classic/core';

@Directive({
  selector: '[my-dir]',
  host: {'[@expand]': 'expandedState', '[@fadeOut]': 'true', '[@shrink]': 'isSmall'}
})
export class MyDirective {
  expandedState = 'collapsed';
  isSmall = true;
}
