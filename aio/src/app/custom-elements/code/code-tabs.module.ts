import { NgModule, Type } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { CodeTabsComponent } from './code-tabs.component';
import { MatLegacyCardModule as MatCardModule } from '@angular-classic/material/legacy-card';
import { MatLegacyTabsModule as MatTabsModule } from '@angular-classic/material/legacy-tabs';
import { CodeModule } from './code.module';
import { WithCustomElementComponent } from '../element-registry';

@NgModule({
  imports: [ CommonModule, MatCardModule, MatTabsModule, CodeModule ],
  declarations: [ CodeTabsComponent ],
  exports: [ CodeTabsComponent ]
})
export class CodeTabsModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = CodeTabsComponent;
}
