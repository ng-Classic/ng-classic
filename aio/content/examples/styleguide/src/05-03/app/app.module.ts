import { NgModule } from '@angular-classic/core';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';
import { HeroButtonComponent } from './heroes';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '05-03', component: AppComponent }])
  ],
  declarations: [
    AppComponent,
    HeroButtonComponent
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
