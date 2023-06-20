/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {bootstrapApplication} from '@angular-classic/platform-browser';
import {provideAnimations} from '@angular-classic/platform-browser/animations';
import {provideRouter} from '@angular-classic/router';
import {ApplicationEnvironment, ApplicationOperations} from 'ng-devtools';

import {DemoApplicationEnvironment} from '../../../src/demo-application-environment';
import {DemoApplicationOperations} from '../../../src/demo-application-operations';

import {AppComponent} from './app/app.component';


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter([
      {
        path: '',
        loadComponent: () =>
            import('./app/devtools-app/devtools-app.component').then((m) => m.DevToolsComponent),
        pathMatch: 'full',
      },
      {
        path: 'demo-app',
        loadChildren: () => import('./app/demo-app/demo-app.component').then((m) => m.ROUTES),
      },
    ]),
    {
      provide: ApplicationOperations,
      useClass: DemoApplicationOperations,
    },
    {
      provide: ApplicationEnvironment,
      useClass: DemoApplicationEnvironment,
    },
  ]
});
