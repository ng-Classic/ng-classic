/* eslint-disable @angular-classic-eslint/no-inputs-metadata-property, @angular-classic-eslint/no-outputs-metadata-property */
import { Component, EventEmitter } from '@angular-classic/core';

@Component({
  selector: 'app-in-the-metadata',
  templateUrl: './in-the-metadata.component.html',
  styleUrls: ['./in-the-metadata.component.css'],
  inputs: ['clearanceItem'],
  outputs: ['buyEvent']
})
export class InTheMetadataComponent  {


  buyEvent = new EventEmitter<string>();
  clearanceItem = '';

  buyIt() {
    console.warn('Child says: emitting buyEvent with', this.clearanceItem);
    this.buyEvent.emit(this.clearanceItem);
  }

}
