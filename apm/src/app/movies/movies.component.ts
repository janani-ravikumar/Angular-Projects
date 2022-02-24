import { Component, OnInit } from '@angular/core';
import { IMovies } from './movies';
import { MoviesService } from './movies.service';

@Component({
  selector: 'pm-movies',
  templateUrl: './movies.component.html',
  styles: [`thead {
    color: #337AB7;
  }`]
})
export class MoviesComponent implements OnInit {
  public pageTitle = "Movies List"
  public movies: IMovies[] = [];
  public errorMessage: string = '';
  constructor(private readonly moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: movies => this.movies = movies,
      error: () => this.errorMessage
    });
  }
}
