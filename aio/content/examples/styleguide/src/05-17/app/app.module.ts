import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';
import { HeroComponent, HeroListComponent } from './heroes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild([{ path: '05-17', component: AppComponent }])
  ],
  declarations: [
    AppComponent,
    HeroComponent,
    HeroListComponent
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
