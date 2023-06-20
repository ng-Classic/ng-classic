import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';
import { HeroComponent } from './heroes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild([{ path: '05-16', component: AppComponent }])
  ],
  declarations: [
    AppComponent,
    HeroComponent
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
