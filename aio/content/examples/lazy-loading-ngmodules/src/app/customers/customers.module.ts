// #docplaster
// #docregion customers-module
import { NgModule } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  declarations: [CustomersComponent]
})
export class CustomersModule { }
// #enddocregion customers-module
