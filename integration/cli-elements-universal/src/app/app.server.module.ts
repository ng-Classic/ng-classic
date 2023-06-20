import { NgModule } from '@angular-classic/core';
import { ServerModule } from '@angular-classic/platform-server';
import { RouterModule } from '@angular-classic/router';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  imports: [
    AppModule,
    RouterModule.forRoot([]),
    ServerModule,
  ],
})
export class AppServerModule {}
