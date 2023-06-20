// #docregion
/* avoid */

import { OnInit } from '@angular-classic/core';
import { HttpClient } from '@angular-classic/common/http';

import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Hero } from '../shared/hero.model';

const heroesUrl = 'http://angular-classic.com';

export class HeroListComponent implements OnInit {
  heroes: Hero[];
  constructor(private http: HttpClient) {}
  getHeroes() {
    this.heroes = [];
    this.http.get(heroesUrl).pipe(
      catchError(this.catchBadResponse),
      finalize(() => this.hideSpinner())
    ).subscribe((heroes: Hero[]) => this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeroes();
  }

  private catchBadResponse(err: any, source: Observable<any>) {
    // log and handle the exception
    return new Observable();
  }

  private hideSpinner() {
    // hide the spinner
  }
}
