// #docplaster
// #docregion use-input
import { Component, Input } from '@angular-classic/core'; // First, import Input
// #enddocregion use-input

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})

// #docregion use-input
export class ItemDetailComponent {
  @Input() item = ''; // decorate the property with @Input()
}
// #enddocregion use-input
