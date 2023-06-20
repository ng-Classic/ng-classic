import { BrowserModule } from '@angular-classic/platform-browser';
import { LOCALE_ID, NgModule } from '@angular-classic/core';
import { registerLocaleData } from '@angular-classic/common';
import localeFr from '@angular-classic/common/locales/fr';

import { AppComponent } from './app.component';

// adding this code to detect issues like https://github.com/ng-classic/ng-classic-cli/issues/10322
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
