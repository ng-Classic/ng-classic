/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';
import {ServerModule} from '@angular-classic/platform-server';
import {Lib2Module} from 'lib2_built/module';

@Component({
  selector: 'id-app',
  template: '<lib2-cmp></lib2-cmp>',
})
export class AppComponent {
}

@NgModule({
  imports: [
    Lib2Module,
    BrowserModule,
    ServerModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class BasicAppModule {
}
