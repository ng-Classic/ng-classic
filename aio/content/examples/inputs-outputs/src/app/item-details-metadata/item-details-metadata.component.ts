// #docplaster
// #docregion use-input-metadata-required
import { Component, Input } from '@angular-classic/core'; // First, import Input
// #enddocregion use-input-metadata-required
// #docregion use-input-metadata-boolean-transform
import { booleanAttribute } from '@angular-classic/core'; // First, import booleanAttribute
// #enddocregion use-input-metadata-boolean-transform
@Component({
  selector: 'app-item-detail-metadata',
  templateUrl: './item-details-metadata.component.html'
})


export class ItemDetailMetadataComponent {
  // #docregion use-input-metadata-required
  @Input({required: true}) item!: string; // Second, decorate the property with required metadata
  // #enddocregion use-input-metadata-required

  // #docregion use-input-metadata-boolean-transform
  @Input({transform: booleanAttribute}) itemAvailability!: boolean; // Second, decorate the property with transform
  // #enddocregion use-input-metadata-boolean-transform
}

