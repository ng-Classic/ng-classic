/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';
import {platformBrowserDynamic} from '@angular-classic/platform-browser-dynamic';
import {RouterModule} from '@angular-classic/router';

import {DbService, DraftsCmp, InboxApp, InboxCmp, ROUTER_CONFIG} from './app/inbox-app';

@NgModule({
  providers: [DbService],
  declarations: [InboxCmp, DraftsCmp, InboxApp],
  imports: [RouterModule.forRoot(ROUTER_CONFIG, {useHash: true}), BrowserModule],
  bootstrap: [InboxApp],
})
export class RoutingExampleModule {
}

platformBrowserDynamic().bootstrapModule(RoutingExampleModule);
