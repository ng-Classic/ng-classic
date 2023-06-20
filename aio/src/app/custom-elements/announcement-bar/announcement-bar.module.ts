import { NgModule, Type } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { HttpClientModule } from '@angular-classic/common/http';
import { SharedModule } from '../../shared/shared.module';
import { AnnouncementBarComponent } from './announcement-bar.component';
import { WithCustomElementComponent } from '../element-registry';

@NgModule({
  imports: [ CommonModule, SharedModule, HttpClientModule ],
  declarations: [ AnnouncementBarComponent ]
})
export class AnnouncementBarModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = AnnouncementBarComponent;
}
