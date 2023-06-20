import { Component } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  // #docregion home-template
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city">
        <button class="primary" type="button">Search</button>
      </form>
    </section>
  `,
  // #enddocregion
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {

}
