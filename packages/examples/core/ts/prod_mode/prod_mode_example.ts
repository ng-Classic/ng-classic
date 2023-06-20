/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {enableProdMode, NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';
import {platformBrowserDynamic} from '@angular-classic/platform-browser-dynamic';

import {MyComponent} from './my_component';

enableProdMode();

@NgModule({imports: [BrowserModule], declarations: [MyComponent], bootstrap: [MyComponent]})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
