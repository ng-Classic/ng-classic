import { Injectable } from '@angular-classic/core';
import { HttpClient } from '@angular-classic/common/http';

import { Observable } from 'rxjs';

import { Hero } from './hero.model';

@Injectable()
export class HeroService {

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('api/heroes');
  }
}
