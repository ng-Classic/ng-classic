import { NgModule } from '@angular-classic/core';
import { RouterModule } from '@angular-classic/router';

import { ContactComponent } from './contact.component';

const routes = [
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ContactRoutingModule {}

