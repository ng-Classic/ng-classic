import { Component } from '@angular-classic/core';
import { HEROES } from './mock-heroes';

@Component({
  selector: 'app-hero-list',
  template: `
    <div *ngFor="let hero of heroes">
      {{hero.id}} - {{hero.name}}
    </div>
  `
})
export class HeroListComponent {
  heroes = HEROES;
}
