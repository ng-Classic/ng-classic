// #docregion
import { Pipe, PipeTransform } from '@angular-classic/core';

@Pipe({name: 'checkmark'})
export class CheckmarkPipe implements PipeTransform {
  transform(input: boolean) {
    return input ? '\u2713' : '\u2718';
  }
}
