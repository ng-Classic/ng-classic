// #docregion
import { Component, EventEmitter } from '@angular-classic/core';
// #docregion example
/* avoid */

@Component({
  selector: 'toh-hero-button',
  template: `<button type="button"></button>`,
  inputs: [
    'label'
  ],
  outputs: [
    'heroChange'
  ]
})
export class HeroButtonComponent {
  heroChange = new EventEmitter<any>();
  label: string;
}
// #enddocregion example
