import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';
import { HeroListComponent } from './heroes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild([{ path: '05-15', component: AppComponent }])
  ],
  declarations: [
    AppComponent,
    HeroListComponent
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
