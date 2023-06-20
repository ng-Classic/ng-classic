import { NgModule } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { FormsModule } from '@angular-classic/forms';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {}
