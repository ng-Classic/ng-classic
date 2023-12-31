// #docregion add-imports
import { Component, Input } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { HousingLocation } from '../housinglocation';
// #enddocregion
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      housing-location works!
    </p>
  `,
  styleUrls: ['./housing-location.component.css'],
})

// #docregion add-housing-location-property
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
// #enddocregion
