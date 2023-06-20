import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <!-- A couple of security-sensitive attributes with constant values -->
    <embed src="https://angular-classic.com/" />
    <iframe srcdoc="<h1>Angular</h1>"></iframe>
    <object data="https://angular-classic.com/" codebase="/"></object>

    <!-- Repeated element to make sure attribute deduplication works properly -->
    <embed src="https://angular-classic.com/" />

    <!-- Another element with a src attribute that is not security sensitive -->
    <img src="https://angular-classic.com/" />
  `
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
