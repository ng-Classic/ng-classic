import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';

import { AppComponent } from './app.component';
import { CompWithHostBindingComponent } from './comp-with-host-binding.component';
import { MyInputWithAttributeDecoratorComponent } from './my-input-with-attribute-decorator.component';

@NgModule({
  declarations: [
    AppComponent,
    CompWithHostBindingComponent,
    MyInputWithAttributeDecoratorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
