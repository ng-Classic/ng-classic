/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable: no-duplicate-imports
import {Component} from '@angular-classic/core';
// #docregion registration-options
import {NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';
import {ServiceWorkerModule, SwRegistrationOptions} from '@angular-classic/service-worker';
// #enddocregion registration-options
import {SwUpdate} from '@angular-classic/service-worker';
// tslint:enable: no-duplicate-imports

@Component({
  selector: 'example-app',
  template: 'SW enabled: {{ swu.isEnabled }}',
})
export class AppComponent {
  constructor(readonly swu: SwUpdate) {}
}
// #docregion registration-options

@NgModule({
  // #enddocregion registration-options
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  // #docregion registration-options
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js'),
  ],
  providers: [
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({enabled: location.search.includes('sw=true')}),
    },
  ],
})
export class AppModule {
}
// #enddocregion registration-options
