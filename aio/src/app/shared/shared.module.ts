import { NgModule } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SelectComponent } from './select/select.component';
import { MatIconModule } from '@angular-classic/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    SearchResultsComponent,
    SelectComponent,
    MatIconModule,
  ],
  declarations: [
    SearchResultsComponent,
    SelectComponent
  ]
})
export class SharedModule {}
