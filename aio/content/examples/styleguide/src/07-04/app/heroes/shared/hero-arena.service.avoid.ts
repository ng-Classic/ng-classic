// #docregion
import { Inject } from '@angular-classic/core';
import { HttpClient } from '@angular-classic/common/http';

import { HeroService } from './hero.service';
// #docregion example
/* avoid */

export class HeroArena {
  constructor(
      @Inject(HeroService) private heroService: HeroService,
      @Inject(HttpClient) private http: HttpClient) {}
}
// #enddocregion example
