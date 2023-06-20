/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {HttpClientJsonpModule, HttpClientModule} from '@angular-classic/common/http';
import {NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';
import {platformBrowserDynamic} from '@angular-classic/platform-browser-dynamic';

import {JsonpCmp} from './app/jsonp_comp';

@NgModule({
  bootstrap: [JsonpCmp],
  declarations: [JsonpCmp],
  imports: [BrowserModule, HttpClientModule, HttpClientJsonpModule]
})
export class ExampleModule {
}

platformBrowserDynamic().bootstrapModule(ExampleModule);
