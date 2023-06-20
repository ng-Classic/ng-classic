/* eslint-disable @angular-classic-eslint/directive-selector */
// #docregion
import { Directive, ViewContainerRef } from '@angular-classic/core';

@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

