/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';
import {FormsModule} from '@angular-classic/forms';
import {MatDialogModule} from '@angular-classic/material/dialog';
import {MatFormFieldModule} from '@angular-classic/material/form-field';
import {MatInputModule} from '@angular-classic/material/input';
import {RouterModule} from '@angular-classic/router';

import {AppTodoComponent} from './app-todo.component';
import {DialogComponent} from './dialog.component';

@NgModule({
  declarations: [AppTodoComponent, DialogComponent],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: 'todos',
        component: AppTodoComponent,
        children: [
          {
            path: 'app',
            loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
          },
          {
            path: 'about',
            loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
          },
          {
            path: '**',
            redirectTo: 'app',
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'todos',
      },
    ]),
  ],
  exports: [AppTodoComponent],
  bootstrap: [AppTodoComponent],
})
export class AppModule {
}
