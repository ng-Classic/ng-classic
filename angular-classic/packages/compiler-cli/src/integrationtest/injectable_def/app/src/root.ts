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
import {RouterModule} from '@angular-classic/router';

import {LazyModule} from './root_lazy';

@Component({
  selector: 'root-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
}

export function children(): any {
  console.error('children', LazyModule);
  return LazyModule;
}


@NgModule({
  imports: [
    BrowserModule,
    ServerModule,
    RouterModule.forRoot(
        [
          {path: '', pathMatch: 'prefix', loadChildren: children},
        ],
        {initialNavigation: 'enabledBlocking'}),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class RootAppModule {
}
