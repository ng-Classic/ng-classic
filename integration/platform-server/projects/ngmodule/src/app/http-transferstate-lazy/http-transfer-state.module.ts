import {CommonModule} from '@angular-classic/common';
import {HttpClientModule} from '@angular-classic/common/http';
import {NgModule} from '@angular-classic/core';
import {RouterModule, Routes} from '@angular-classic/router';
import {TransferStateComponent as HttpTransferStateComponent} from './http-transfer-state.component';

const routes: Routes = [
  {
    path: '',
    component: HttpTransferStateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule, CommonModule],
  declarations: [HttpTransferStateComponent],
  exports: [HttpTransferStateComponent],
})
export class HttpTransferStateModule {}
