/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';
import {platformBrowserDynamic} from '@angular-classic/platform-browser-dynamic';

@Component({selector: 'app-root', template: 'Hello {{ name }}!'})
class MyApp {
  name: string = 'World';
}

@NgModule({imports: [BrowserModule], bootstrap: [MyApp]})
class AppModule {
}

export function main() {
  platformBrowserDynamic().bootstrapModule(AppModule);
}
