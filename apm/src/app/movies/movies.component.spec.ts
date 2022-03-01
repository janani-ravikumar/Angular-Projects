import { DatePipe } from "@angular/common";
import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { IMovies } from "./movies";
import { MoviesComponent } from "./movies.component";
import { MoviesService } from "./movies.service";

describe('MoviesComponent', () => {
    let fixture: ComponentFixture<MoviesComponent>,
        debugElement: DebugElement,
        component: MoviesComponent,
        moviesService: any

    beforeEach(() => {
        const moviesServiceStub = jasmine.createSpyObj('MoviesService', ['getMovies']);
        TestBed.configureTestingModule({
            declarations: [
                MoviesComponent
            ],
            providers: [
                { provide: MoviesService, useValue: moviesServiceStub }
            ]
        });

        moviesService = TestBed.inject(MoviesService);
        moviesService.getMovies.and.returnValue(of(movies));

        fixture = TestBed.createComponent(MoviesComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create the app and call getMovies method during initialization', () => {
        expect(component).toBeTruthy();
        expect(moviesService.getMovies).toHaveBeenCalledTimes(1);
        expect(component.movies).toEqual(movies);
    });

    it('should have the title - Movies List', () => {
        expect(component.pageTitle).toEqual('Movies List');
    });

    describe('MoviesTable', () => {
        it('should display the director name in lowercase', () => {
            var element = debugElement.nativeElement.querySelector('table>tbody tr:nth-child(1) td:nth-child(2)');

            expect(element.textContent).toEqual(movies[0].director.toLocaleLowerCase());
        });

        it('should display the created date in shortDate format', () => {
            var element = debugElement.nativeElement.querySelector('table>tbody tr:nth-child(1) td:nth-child(3)');
            var pipe = new DatePipe('en-US');
            const formattedDate = pipe.transform(movies[0].created, 'shortDate');

            expect(element.textContent).toEqual(formattedDate);
        });
    });
})

let movies: IMovies[] = [
    {
        title: "The Empire Strikes Back",
        director: "Irvin kershner",
        characters: ["Jim, Joe"],
        created: "2014-05-10"
    }
];
