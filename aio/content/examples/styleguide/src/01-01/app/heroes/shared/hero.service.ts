// #docregion
import { Injectable } from '@angular-classic/core';

import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES);
  }
}
