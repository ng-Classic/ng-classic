import { NgModule } from '@angular-classic/core';
import { RouterModule } from '@angular-classic/router';

import { AppComponent } from './app.component';
import { HighlightDirective } from './shared';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '06-01', component: AppComponent }])
  ],
  declarations: [
    AppComponent,
    HighlightDirective
  ],
  exports: [ AppComponent ]
})
export class AppModule {}
