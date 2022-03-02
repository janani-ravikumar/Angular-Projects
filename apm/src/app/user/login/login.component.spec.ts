import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { By } from "@angular/platform-browser";
import { LoginComponent } from "./login.component";
import { UserService } from "../user.service";

describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent>,
        component: LoginComponent,
        userService: any,
        router: Router;

    beforeEach(async () => {
        var userServiceStub = jasmine.createSpyObj('UserService', ['login']);
        var routerSpy = {
            navigate: jasmine.createSpy('navigate')
        };

        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            providers: [
                { provide: UserService, useValue: userServiceStub },
                { provide: Router, useValue: routerSpy }
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ]
        });

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);
    });

    describe('loginForm', () => {
        it('should be invalid when values are empty', () => {
            //by default form control values are empty
            expect(component.loginForm?.valid).toBeFalse();
        });

        it('should display errorMessage as Required when values are empty', () => {
            //by default form control values are empty
            expect(component.loginForm?.controls["userName"]?.hasError('required')).toBeTruthy();
            expect(component.loginForm?.controls["password"]?.hasError('required')).toBeTruthy();
            expect(component.loginForm?.valid).toBeFalse();
        });

        it('should be valid when values are present', () => {
            //set form control values
            component.loginForm?.controls["userName"]?.setValue('Janani');
            component.loginForm?.controls["password"]?.setValue('abcd1234');

            expect(component.loginForm?.valid).toBeTrue();
        });

        it('should call Login method and then navigate to Welcome page when valid data is submitted', () => {
            component.loginForm?.controls["userName"]?.setValue('Janani');
            component.loginForm?.controls["password"]?.setValue('abcd1234');

            let form = fixture.debugElement.query(By.css('form'));
            form.triggerEventHandler('submit', null);
            fixture.detectChanges();

            expect(component.loginForm?.valid).toBeTruthy();
            expect(userService.login).toHaveBeenCalledTimes(1);
            expect(router.navigate).toHaveBeenCalledWith(["/welcome"]);
        });

        it('should navigate to Welcome page when cancel button is clicked', () => {
            var cancelButton = fixture.debugElement.query(By.css('button[type=button]')).nativeElement;

            cancelButton.click();
            fixture.detectChanges();

            expect(cancelButton.textContent).toEqual('Cancel');
            expect(router.navigate).toHaveBeenCalledWith(["/welcome"]);
        });
    });
})