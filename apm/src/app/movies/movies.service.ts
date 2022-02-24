import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IMovies, IMoviesResult } from './movies';

@Injectable()
export class MoviesService {

  private static readonly url = "https://swapi.dev/api/films/";
  constructor(private readonly http: HttpClient) { }

  public getMovies(): Observable<IMovies[]>  {
    return this.http.get<IMoviesResult>(MoviesService.url).pipe(
      map((data: IMoviesResult) =>  data.results),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(() => errorMessage);
  }
}
