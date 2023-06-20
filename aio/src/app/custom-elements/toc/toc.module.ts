import { NgModule, Type } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { MatIconModule } from '@angular-classic/material/icon';
import { WithCustomElementComponent } from '../element-registry';
import { TocComponent } from './toc.component';

@NgModule({
  imports: [ CommonModule, MatIconModule ],
  declarations: [ TocComponent ],
})
export class TocModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = TocComponent;
}
