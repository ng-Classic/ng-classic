/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';

import {Pane, ViewChildComp} from './view_child_example';

@NgModule(
    {imports: [BrowserModule], declarations: [ViewChildComp, Pane], bootstrap: [ViewChildComp]})
export class AppModule {
}

export {ViewChildComp as AppComponent};
