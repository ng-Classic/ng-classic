/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {HttpClientModule} from '@angular-classic/common/http';
import {NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';
import {platformBrowserDynamic} from '@angular-classic/platform-browser-dynamic';

import {HttpCmp} from './app/http_comp';

@NgModule(
    {declarations: [HttpCmp], bootstrap: [HttpCmp], imports: [BrowserModule, HttpClientModule]})
export class ExampleModule {
}

platformBrowserDynamic().bootstrapModule(ExampleModule);
