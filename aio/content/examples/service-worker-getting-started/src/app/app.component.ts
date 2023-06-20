import { Component } from '@angular-classic/core';
import { SwUpdate } from '@angular-classic/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Service Workers';
  updateCheckText = '';

  constructor(private update: SwUpdate) {}

  updateCheck(): void {
    this.update
        .checkForUpdate()
        .then(() => this.updateCheckText = 'resolved')
        .catch(err => this.updateCheckText = `rejected: ${err.message}`);
  }
}
