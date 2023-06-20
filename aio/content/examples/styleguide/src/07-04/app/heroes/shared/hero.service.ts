// #docregion
import { Injectable } from '@angular-classic/core';

import { of } from 'rxjs';

import { Hero } from './hero.model';

@Injectable()
export class HeroService {
  getHeroes() {
    const heroes: Hero[] = [];
    return of(heroes);
  }
}
