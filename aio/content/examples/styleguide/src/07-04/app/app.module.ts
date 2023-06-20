import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forChild([{ path: '07-04', component: AppComponent }])
  ],
  declarations: [
    AppComponent
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
