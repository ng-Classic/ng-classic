// #docregion global-locale
import '@angular-classic/common/locales/global/fr';
// #enddocregion global-locale
// #docregion locale-id
import { LOCALE_ID, NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';

import { AppComponent } from '../src/app/app.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent ],
  providers: [ { provide: LOCALE_ID, useValue: 'fr' } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
// #enddocregion locale-id
