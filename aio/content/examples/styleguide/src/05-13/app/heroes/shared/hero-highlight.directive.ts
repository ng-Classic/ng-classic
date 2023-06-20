// #docregion
import { Directive, ElementRef, Input, OnChanges } from '@angular-classic/core';

// eslint-disable-next-line @angular-classic-eslint/directive-selector
@Directive({ selector: '[heroHighlight]' })
export class HeroHighlightDirective implements OnChanges {

  // Aliased because `color` is a better property name than `heroHighlight`
  @Input('heroHighlight') color = '';

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.color || 'yellow';
  }
}
