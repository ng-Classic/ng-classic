// #docregion
import { Component } from '@angular-classic/core';
import { HeroesService } from './heroes.service';
import { Hero } from '../hero';

@Component({
  selector: 'hero-detail',
  template: `
    <h2>{{hero.id}}: {{hero.name}}</h2>
  `
})
export class HeroDetailComponent {
  hero: Hero;
  constructor(heroes: HeroesService) {
    this.hero = heroes.get()[0];
  }
}
