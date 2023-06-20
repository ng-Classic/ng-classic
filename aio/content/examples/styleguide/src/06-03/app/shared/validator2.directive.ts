/* eslint-disable @angular-classic-eslint/no-host-metadata-property */
// #docregion
import { Directive } from '@angular-classic/core';

@Directive({
  selector: '[tohValidator2]',
  host: {
    '[attr.role]': 'role',
    '(mouseenter)': 'onMouseEnter()'
  }
})
export class Validator2Directive {
  role = 'button';
  onMouseEnter() {
    // do work
  }
}
