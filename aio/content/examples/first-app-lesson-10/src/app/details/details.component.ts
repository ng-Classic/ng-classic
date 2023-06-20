import { Component } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      details works!
    </p>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
}
