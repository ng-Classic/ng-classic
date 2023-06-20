// imports
import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';

import { AppComponent } from './app.component';

// @NgModule decorator with its metadata
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
