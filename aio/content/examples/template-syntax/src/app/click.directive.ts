/* eslint-disable @angular-classic-eslint/directive-class-suffix,
                  @angular-classic-eslint/directive-selector,
                  @angular-classic-eslint/no-output-rename,
                  @angular-classic-eslint/no-outputs-metadata-property */
import { Directive, ElementRef, EventEmitter, Output } from '@angular-classic/core';

@Directive({selector: '[myClick]'})
export class ClickDirective {
  @Output('myClick') clicks = new EventEmitter<string>(); //  @Output(alias) propertyName = ...

  toggle = false;

  constructor(el: ElementRef) {
    el.nativeElement
      .addEventListener('click', (event: Event) => {
        this.toggle = !this.toggle;
        this.clicks.emit(this.toggle ? 'Click!' : '');
      });
  }
}

@Directive({
  selector: '[myClick2]',
  outputs: ['clicks:myClick']  // propertyName:alias
})
export class ClickDirective2 {
  clicks = new EventEmitter<string>();
  toggle = false;

  constructor(el: ElementRef) {
    el.nativeElement
      .addEventListener('click', (event: Event) => {
        this.toggle = !this.toggle;
        this.clicks.emit(this.toggle ? 'Click2!' : '');
      });
  }
}
