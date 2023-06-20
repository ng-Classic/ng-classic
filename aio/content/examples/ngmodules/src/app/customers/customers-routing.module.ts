import { NgModule } from '@angular-classic/core';
import { Routes,
         RouterModule } from '@angular-classic/router';

import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list.component';
import { CustomersDetailComponent } from './customers-detail.component';

const routes: Routes = [
  { path: '',
    component: CustomersComponent,
    children: [
      { path: '',    component: CustomersListComponent },
      { path: ':id', component: CustomersDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
