import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';


import { AppComponent } from './app.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ClickDirective } from './click.directive';


@NgModule({
  declarations: [
    AppComponent,
    ItemDetailComponent,
    ClickDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
