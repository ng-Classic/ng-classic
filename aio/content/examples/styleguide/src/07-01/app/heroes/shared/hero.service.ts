// #docregion
import { Injectable } from '@angular-classic/core';
import { HttpClient } from '@angular-classic/common/http';

import { Hero } from './hero.model';

@Injectable()
// #docregion example
export class HeroService {
  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http.get<Hero[]>('api/heroes');
  }
}
// #enddocregion example
