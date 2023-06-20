import {CommonModule} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';
import {BrowserAnimationsModule} from '@angular-classic/platform-browser/animations';
import {BrowserModule} from '@angular-classic/platform-browser';

import {AppComponent, AnimationsComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
