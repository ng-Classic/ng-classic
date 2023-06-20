// #docplaster
import { NgModule } from '@angular-classic/core';
import { Routes, RouterModule } from '@angular-classic/router';

// #docregion orders-routing-module-detail
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  }
];
// #enddocregion orders-routing-module-detail

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
