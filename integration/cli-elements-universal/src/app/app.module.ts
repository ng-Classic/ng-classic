import { isPlatformBrowser } from '@angular-classic/common';
import { CUSTOM_ELEMENTS_SCHEMA, Inject, Injector, NgModule, PLATFORM_ID } from '@angular-classic/core';
import { createCustomElement } from '@angular-classic/elements';
import { BrowserModule } from '@angular-classic/platform-browser';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';
import { TitleComponent } from './title.component';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
    TitleComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule {
  constructor(injector: Injector, @Inject(PLATFORM_ID) platformId: object) {
    if (isPlatformBrowser(platformId)) {
      customElements.define('app-title-ce', createCustomElement(TitleComponent, {injector}));
    }
  }
}
