import { NgModule } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { CodeComponent } from './code.component';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular-classic/material/legacy-snack-bar';
import { PrettyPrinter } from './pretty-printer.service';

@NgModule({
  imports: [ CommonModule, MatSnackBarModule ],
  declarations: [ CodeComponent ],
  exports: [ CodeComponent ],
  providers: [ PrettyPrinter ]
})
export class CodeModule { }
