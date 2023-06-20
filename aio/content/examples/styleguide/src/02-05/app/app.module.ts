// #docplaster
// #docregion
import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    // #enddocregion
    RouterModule.forChild([{ path: '02-05', component: AppComponent }])
    // #docregion
  ],
  declarations: [
    AppComponent
  ],
  exports: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
// #enddocregion
