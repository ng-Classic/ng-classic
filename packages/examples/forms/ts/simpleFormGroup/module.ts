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
import {SimpleFormGroup} from './simple_form_group_example';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [SimpleFormGroup],
  bootstrap: [SimpleFormGroup]
})
export class AppModule {
}

export {SimpleFormGroup as AppComponent};
