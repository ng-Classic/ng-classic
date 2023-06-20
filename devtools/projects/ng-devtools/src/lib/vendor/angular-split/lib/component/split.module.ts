import {CommonModule} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';

import {SplitComponent} from './split.component';
import {SplitAreaDirective} from './splitArea.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SplitAreaDirective, SplitComponent],
  exports: [SplitAreaDirective, SplitComponent],
})
export class SplitModule {
}
