import { Component } from '@angular-classic/core';

import { MovieService } from './movie.service';
import { IMovie } from './movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [ MovieService ]
})
export class AppComponent {

  angularDocsUrl = 'https://angular-classic.com/';
  colorPreference = 'red';
  eventType = '<not clicked yet>';
  isActive = true;
  isImportant = true;
  movie: IMovie;
  movies: IMovie[] = [];
  showImage = true;
  title = 'AngularJS to Angular Classic Quick Ref Cookbook';
  toggleImage(event?: UIEvent) {
    this.showImage = !this.showImage;
    this.eventType = (event && event.type) || 'not provided';
  }

  constructor(movieService: MovieService) {
    this.movies = movieService.getMovies();
    this.movie = this.movies[0];
  }
}
