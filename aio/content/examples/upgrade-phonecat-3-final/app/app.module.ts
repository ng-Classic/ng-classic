import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { FormsModule } from '@angular-classic/forms';
import { HttpClientModule } from '@angular-classic/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckmarkPipe } from './core/checkmark/checkmark.pipe';
import { Phone } from './core/phone/phone.service';
import { PhoneDetailComponent } from './phone-detail/phone-detail.component';
import { PhoneListComponent } from './phone-list/phone-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PhoneListComponent,
    CheckmarkPipe,
    PhoneDetailComponent
  ],
  providers: [
    Phone
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
