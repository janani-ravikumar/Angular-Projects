import { TestBed } from "@angular/core/testing";
import { IMovies, IMoviesResult } from "./movies";
import { MoviesService } from "./movies.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpErrorResponse } from "@angular/common/http";

describe('MoviesService', () => {
    let moviesService: MoviesService,
        mockHttp: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                MoviesService
            ]
        });

        mockHttp = TestBed.inject(HttpTestingController);
        moviesService = TestBed.inject(MoviesService);
    });

    afterEach(() => {
        mockHttp.verify();
    });

    describe('getMovies', () => {
        const moviesApiUrl = "https://swapi.dev/api/films/";
        it('should get the list of movies', () => {
            var movies: IMovies[] = [
                {
                    title: "The Empire Strikes Back",
                    director: "Irvin kershner",
                    characters: ["Jim, Joe"],
                    created: "2014-05-10"
                }
            ];
            var moviesResults: IMoviesResult = {
                results: movies
            };

            moviesService.getMovies().subscribe((response) => {
                expect(response.length).toBe(movies.length);
                expect(response).toEqual(movies);
            });

            var request = mockHttp.expectOne(moviesApiUrl);
            request.flush(moviesResults);
            expect(request.request.method).toBe("GET");
        });

        it('should throw error when service fails', () => {
            const errorResponse = new HttpErrorResponse({
                error: '404 error',
                status: 404,
                statusText: 'Not Found',
            });
            var expectedError = `Server returned code: 404, error message is: Http failure response for ${moviesApiUrl}: 404 Not Found`;
            moviesService.getMovies().subscribe({
                next: () => fail('Should have failed with 404 error'),
                error: (error: string) => {
                    expect(error).toBe(expectedError);
                }
            });

            var request = mockHttp.expectOne(moviesApiUrl);
            request.flush(errorResponse.error, errorResponse);
            expect(request.request.method).toBe("GET");
        });
    });
})


