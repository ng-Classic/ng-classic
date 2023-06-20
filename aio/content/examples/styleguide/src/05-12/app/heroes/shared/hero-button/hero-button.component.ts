// #docregion
import { Component, EventEmitter, Input, Output } from '@angular-classic/core';

// #docregion example
@Component({
  selector: 'toh-hero-button',
  template: `<button type="button">{{label}}</button>`
})
export class HeroButtonComponent {
  @Output() heroChange = new EventEmitter<any>();
  @Input() label = '';
}
// #enddocregion example
