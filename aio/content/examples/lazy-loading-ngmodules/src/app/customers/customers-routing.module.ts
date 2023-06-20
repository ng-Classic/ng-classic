// #docplaster
// #docregion customers-routing-module
import { NgModule } from '@angular-classic/core';
import { Routes, RouterModule } from '@angular-classic/router';

import { CustomersComponent } from './customers.component';


const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
// #enddocregion customers-routing-module
