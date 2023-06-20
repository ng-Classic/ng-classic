// #docregion
import { NgModule } from '@angular-classic/core';
import { RouterModule, Routes } from '@angular-classic/router';

import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const heroesRoutes: Routes = [
  { path: 'heroes',  component: HeroListComponent },
// #docregion hero-detail-route
  { path: 'hero/:id', component: HeroDetailComponent }
// #enddocregion hero-detail-route
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
// #enddocregion
