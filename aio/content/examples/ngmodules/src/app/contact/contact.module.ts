import { NgModule } from '@angular-classic/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular-classic/forms';

import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ContactRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ ContactComponent ],
  providers:    [ ContactService ]
})
export class ContactModule { }
