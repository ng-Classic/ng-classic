// #docplaster
// imports
import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';
import { FormsModule } from '@angular-classic/forms';
import { HttpClientModule } from '@angular-classic/common/http';

import { AppComponent } from './app.component';
// #docregion directive-import
import { ItemDirective } from './item.directive';
// #enddocregion directive-import


// @NgModule decorator with its metadata
@NgModule({
// #docregion declarations
  declarations: [
    AppComponent,
    ItemDirective
  ],
  // #enddocregion declarations
  // #docregion imports
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  // #enddocregion imports
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
