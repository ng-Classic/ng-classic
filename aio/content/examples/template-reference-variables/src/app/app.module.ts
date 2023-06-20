import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';

import { FormsModule } from '@angular-classic/forms';



import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
