import { NgModule, Type } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { EmbeddedStackblitzComponent, LiveExampleComponent } from './live-example.component';
import { WithCustomElementComponent } from '../element-registry';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ LiveExampleComponent, EmbeddedStackblitzComponent ]
})
export class LiveExampleModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = LiveExampleComponent;
}
