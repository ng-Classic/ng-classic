import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';
import { FormsModule } from '@angular-classic/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
