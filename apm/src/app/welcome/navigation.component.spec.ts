import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UserService } from "../user/user.service";
import { NavigationComponent } from "./navigation.component"

describe('NavigationComponent', () => {
    let fixture: ComponentFixture<NavigationComponent>,
        debugElement: DebugElement,
        component: NavigationComponent,
        userService: any;

    beforeEach(() => {
        const userServiceStub = jasmine.createSpyObj('UserService', ['isAuthenticated']);

        TestBed.configureTestingModule({
            declarations: [
                NavigationComponent
            ],
            providers: [
                { provide: UserService, useValue: userServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();

        userService = TestBed.inject(UserService);
    });

    it('should have the page Title - My Angular App', () => {
        expect(component.pageTitle).toEqual('My Angular App');
    });

    it('should display login link if user is not aunthenticated', () => {
        userService.isAuthenticated.and.returnValue(false);
        fixture.detectChanges();

        var link = debugElement.nativeElement.querySelectorAll('.nav-link');

        expect(link[link.length - 1].text).toBe('Login');
    })

    it('should display Edit profile menu if user is aunthenticated', () => {
        userService.isAuthenticated.and.returnValue(true);
        fixture.detectChanges();

        var link = debugElement.nativeElement.querySelectorAll('.nav-link');

        expect(link[link.length - 1].text).toBe('Edit Profile');
    })
})