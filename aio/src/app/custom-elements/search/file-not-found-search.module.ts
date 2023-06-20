import { NgModule, Type } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { SharedModule } from '../../shared/shared.module';
import { FileNotFoundSearchComponent } from './file-not-found-search.component';
import { WithCustomElementComponent } from '../element-registry';

@NgModule({
  imports: [ CommonModule, SharedModule ],
  declarations: [ FileNotFoundSearchComponent ]
})
export class FileNotFoundSearchModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = FileNotFoundSearchComponent;
}
