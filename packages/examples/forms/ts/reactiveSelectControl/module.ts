/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular-classic/core';
import {ReactiveFormsModule} from '@angular-classic/forms';
import {BrowserModule} from '@angular-classic/platform-browser';
import {ReactiveSelectComp} from './reactive_select_control_example';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [ReactiveSelectComp],
  bootstrap: [ReactiveSelectComp]
})
export class AppModule {
}

export {ReactiveSelectComp as AppComponent};
