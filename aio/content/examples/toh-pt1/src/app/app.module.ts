// #docplaster
// #docregion
import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';
// #docregion formsmodule-js-import
import { FormsModule } from '@angular-classic/forms'; // <-- NgModel lives here
// #enddocregion formsmodule-js-import

import { AppComponent } from './app.component';
// #docregion heroes-import
import { HeroesComponent } from './heroes/heroes.component';
// #enddocregion heroes-import

@NgModule({
  // #docregion declarations
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  // #enddocregion declarations
  // #docregion ng-imports
  imports: [
    BrowserModule,
    FormsModule
  ],
  // #enddocregion ng-imports
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
