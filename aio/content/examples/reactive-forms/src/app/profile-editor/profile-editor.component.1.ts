// #docplaster
// #docregion formgroup, nested-formgroup
import { Component } from '@angular-classic/core';
// #docregion imports
import { FormGroup, FormControl } from '@angular-classic/forms';
// #enddocregion imports

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
// #docregion formgroup-compare
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
// #enddocregion formgroup
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
// #docregion formgroup
  });
// #enddocregion formgroup, nested-formgroup, formgroup-compare
// #docregion patch-value
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }
// #enddocregion patch-value
// #docregion formgroup, nested-formgroup
}
// #enddocregion formgroup
