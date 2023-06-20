import {CommonModule} from '@angular-classic/common';
import {HttpClientModule} from '@angular-classic/common/http';
import {NgModule} from '@angular-classic/core';
import {RouterModule, Routes} from '@angular-classic/router';
import {TransferStateComponentOnInit} from './http-transferstate-lazy-on-init.component';

const routes: Routes = [
  {
    path: '',
    component: TransferStateComponentOnInit,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule, CommonModule],
  declarations: [TransferStateComponentOnInit],
})
export class HttpTransferStateOnInitModule {}
