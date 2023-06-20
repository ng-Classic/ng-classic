import { NgModule, Type } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { ResourceListComponent } from './resource-list.component';
import { ResourceService } from './resource.service';
import { WithCustomElementComponent } from '../element-registry';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ResourceListComponent ],
  providers: [ ResourceService ]
})
export class ResourceListModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = ResourceListComponent;
}
