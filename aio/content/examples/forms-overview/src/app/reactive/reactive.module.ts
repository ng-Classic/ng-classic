import { NgModule } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { ReactiveFormsModule } from '@angular-classic/forms';
import { FavoriteColorComponent } from './favorite-color/favorite-color.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [FavoriteColorComponent],
  exports: [FavoriteColorComponent],
})
export class ReactiveModule { }
