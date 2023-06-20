import { NgModule } from '@angular-classic/core';
import { RouterModule, Routes } from '@angular-classic/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
