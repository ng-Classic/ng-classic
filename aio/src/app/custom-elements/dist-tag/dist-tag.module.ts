import { NgModule, Type } from '@angular-classic/core';
import { WithCustomElementComponent } from '../element-registry';

import { DistTagComponent } from './dist-tag.component';

@NgModule({
  declarations: [ DistTagComponent ],
})
export class DistTagModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = DistTagComponent;
}
