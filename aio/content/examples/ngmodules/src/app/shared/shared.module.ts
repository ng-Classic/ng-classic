import { NgModule } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { FormsModule } from '@angular-classic/forms';

import { AwesomePipe } from './awesome.pipe';
import { HighlightDirective } from './highlight.directive';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ AwesomePipe, HighlightDirective ],
  exports:      [ AwesomePipe, HighlightDirective,
                  CommonModule, FormsModule ]
})
export class SharedModule { }
