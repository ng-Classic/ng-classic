import { Component } from '@angular-classic/core';
// #docregion activated-route-and-parammap
import { ActivatedRoute, ParamMap } from '@angular-classic/router';
// #enddocregion activated-route-and-parammap
// #docregion rxjs-map
import { map } from 'rxjs/operators';
// #enddocregion rxjs-map

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
// #docregion subscribe
  username$ = this.route.paramMap
    .pipe(
      map((params: ParamMap) => params.get('username'))
    );
// #enddocregion subscribe
// #docregion activatedroute
  constructor(private route: ActivatedRoute) { }
// #enddocregion activatedroute

}
