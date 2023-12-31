// #docregion
import { Component, EventEmitter, Input, Output } from '@angular-classic/core';

import { Hero } from '../model/hero';

// #docregion component
@Component({
  selector: 'dashboard-hero',
  template: `
    <button type="button" (click)="click()" class="hero">
      {{hero.name | uppercase}}
    </button>
  `,
  styleUrls: [ './dashboard-hero.component.css' ]
})
// #docregion class
export class DashboardHeroComponent {
  @Input() hero!: Hero;
  @Output() selected = new EventEmitter<Hero>();
  click() { this.selected.emit(this.hero); }
}
// #enddocregion component, class
