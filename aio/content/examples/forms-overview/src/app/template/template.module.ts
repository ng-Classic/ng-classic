import { NgModule } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { FormsModule } from '@angular-classic/forms';
import { FavoriteColorComponent } from './favorite-color/favorite-color.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [FavoriteColorComponent],
  exports: [FavoriteColorComponent]
})
export class TemplateModule { }
