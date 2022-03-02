import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserService } from "./user.service";
import { By } from "@angular/platform-browser";

describe('UserComponent', () => {
    let fixture: ComponentFixture<UserComponent>,
        component: UserComponent,
        userService: any,
        router: Router;

    beforeEach(() => {
        var userServiceStub = jasmine.createSpyObj('UserService', ['UpdateInfo']);
        var routerSpy = {
            navigate: jasmine.createSpy('navigate'),
            navigateByUrl: jasmine.createSpy('navigateByUrl')
        };

        TestBed.configureTestingModule({
            declarations: [
                UserComponent
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

        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);
    });

    describe('editForm', () => {
        it('should be invalid when values are empty', () => {
            //by default form control values are empty
            expect(component.editForm?.valid).toBeFalse();
        });

        it('should display errorMessage as Required when values are empty', () => {
            //by default form control values are empty
            expect(component.editForm?.controls["firstName"]?.hasError('required')).toBeTruthy();
            expect(component.editForm?.controls["lastName"]?.hasError('required')).toBeTruthy();
            expect(component.editForm?.valid).toBeFalse();
        });

        it('should be valid when values are present', () => {
            //set form control values
            component.editForm?.controls["firstName"]?.setValue('Janani');
            component.editForm?.controls["lastName"]?.setValue('Ravikumar');;

            expect(component.editForm?.valid).toBeTrue();
        });

        it('should call UpdateInfo method and then navigate to Welcome page when valid form data is submitted', () => {
            const firstName = component.editForm?.controls["firstName"];
            const lastName = component.editForm?.controls["lastName"];

            firstName?.setValue('Janani');
            lastName?.setValue('Ravikumar');

            let form = fixture.debugElement.query(By.css('form'));
            form.triggerEventHandler('submit', null);
            fixture.detectChanges();

            expect(component.editForm?.valid).toBeTruthy();
            expect(userService.UpdateInfo).toHaveBeenCalledTimes(1);
            expect(router.navigateByUrl).toHaveBeenCalledWith("/welcome");
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