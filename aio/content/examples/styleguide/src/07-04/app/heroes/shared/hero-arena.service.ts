// #docplaster
// #docregion
import { Injectable } from '@angular-classic/core';
import { HttpClient } from '@angular-classic/common/http';

import { HeroService } from './hero.service';

// #docregion example
@Injectable()
export class HeroArena {
  constructor(
    private heroService: HeroService,
    private http: HttpClient) {}
    // #enddocregion example
    // test harness
    getParticipants() {
      return this.heroService.getHeroes();
    }
    // #docregion example
}
// #enddocregion example
