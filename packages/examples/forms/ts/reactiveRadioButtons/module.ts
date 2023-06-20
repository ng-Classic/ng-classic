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
import {ReactiveRadioButtonComp} from './reactive_radio_button_example';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [ReactiveRadioButtonComp],
  bootstrap: [ReactiveRadioButtonComp]
})
export class AppModule {
}

export {ReactiveRadioButtonComp as AppComponent};
