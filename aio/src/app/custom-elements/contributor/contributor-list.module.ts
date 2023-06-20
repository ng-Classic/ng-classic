import { NgModule, Type } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { MatIconModule } from '@angular-classic/material/icon';
import { ContributorListComponent } from './contributor-list.component';
import { ContributorService } from './contributor.service';
import { ContributorComponent } from './contributor.component';
import { WithCustomElementComponent } from '../element-registry';

@NgModule({
  imports: [ CommonModule, MatIconModule ],
  declarations: [ ContributorListComponent, ContributorComponent ],
  providers: [ ContributorService ]
})
export class ContributorListModule implements WithCustomElementComponent {
  customElementComponent: Type<any> = ContributorListComponent;
}
