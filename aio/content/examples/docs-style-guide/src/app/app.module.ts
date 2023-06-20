// #docregion
import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { FormsModule } from '@angular-classic/forms';

import { AppComponent } from './app.component';

// #docregion class
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
// #enddocregion class
