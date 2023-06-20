import { NgModule } from '@angular-classic/core';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';
import { ToastComponent } from './shared';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '05-14', component: AppComponent }])
  ],
  declarations: [
    AppComponent,
    ToastComponent
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
