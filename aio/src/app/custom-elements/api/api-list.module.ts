import { NgModule, Type } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { HttpClientModule } from '@angular-classic/common/http';
import { SharedModule } from '../../shared/shared.module';
import { ApiListComponent } from './api-list.component';
import { ApiService } from './api.service';
import { WithCustomElementComponent } from '../element-registry';

@NgModule({
  imports: [ CommonModule, SharedModule, HttpClientModule ],
  declarations: [ ApiListComponent ],
  providers: [ ApiService ]
})
export class ApiListModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = ApiListComponent;
}
