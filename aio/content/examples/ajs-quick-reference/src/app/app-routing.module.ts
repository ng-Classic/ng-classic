// #docregion
import { NgModule } from '@angular-classic/core';
import { Routes, RouterModule } from '@angular-classic/router';

import { MovieListComponent } from './movie-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
