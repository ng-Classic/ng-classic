import {registerLocaleData} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';
import localeFr from '@angular-classic/common/locales/fr';
import {AppComponent} from './app.component';

// adding this code to detect issues like https://github.com/ng-classic/ng-classic-cli/issues/10322
// it should not affect the CLI importing additional locale data for compile time inlined bundles.
registerLocaleData(localeFr);

@NgModule({declarations: [AppComponent], imports: [BrowserModule], bootstrap: [AppComponent]})
export class AppModule {
}
