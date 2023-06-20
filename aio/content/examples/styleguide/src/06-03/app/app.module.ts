import { NgModule } from '@angular-classic/core';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';
import { ValidatorDirective, Validator2Directive } from './shared';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '06-03', component: AppComponent }])
  ],
  declarations: [
    AppComponent,
    ValidatorDirective, Validator2Directive
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
