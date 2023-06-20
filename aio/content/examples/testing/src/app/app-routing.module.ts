import { NgModule } from '@angular-classic/core';
import { RouterModule, Routes } from '@angular-classic/router';

import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'about', component: AboutComponent },
  { path: 'heroes', loadChildren: () => import('./hero/hero.module').then(m => m.HeroModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ] // re-export the module declarations
})
export class AppRoutingModule { }
