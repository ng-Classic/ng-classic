import { Component, Input } from '@angular-classic/core';

import { Hero } from '../shared/hero.model';

@Component({
  selector: 'toh-hero',
  template: `...`
})
export class HeroComponent {
  @Input() hero!: Hero;
}


