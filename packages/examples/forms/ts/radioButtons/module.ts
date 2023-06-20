/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular-classic/core';
import {FormsModule} from '@angular-classic/forms';
import {BrowserModule} from '@angular-classic/platform-browser';
import {RadioButtonComp} from './radio_button_example';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [RadioButtonComp],
  bootstrap: [RadioButtonComp]
})
export class AppModule {
}

export {RadioButtonComp as AppComponent};
