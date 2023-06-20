// #docregion
import { Pipe, PipeTransform } from '@angular-classic/core';

@Pipe({ name: 'initCaps' })
export class InitCapsPipe implements PipeTransform {
  transform = (value: string) => value;
}
