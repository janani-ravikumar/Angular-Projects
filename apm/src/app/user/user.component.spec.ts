import { DebugElement } from "@angular/core";
import { ComponentFixture, flushMicrotasks, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserComponent } from "./user.component";
import { UserService } from "./user.service";
import { RouterTestingModule } from '@angular/router/testing';
import { WelcomeComponent } from "../welcome/welcome.component";

describe('UserComponent', () => {

    let fixture: ComponentFixture<UserComponent>,
        debugElement: DebugElement,
        component: UserComponent,
        userServiceStub: Partial<UserService>,
        userService: any,
        router: any;

    beforeEach(() => {
        userServiceStub = jasmine.createSpyObj('UserService', ['UpdateInfo']);

        TestBed.configureTestingModule({
            declarations: [
                UserComponent
            ],
            providers: [
                { provide: UserService, useValue: userServiceStub },
                //{ provide: Router, usevalue: router}
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    { path: 'welcome', component: WelcomeComponent },
                ]),
            ]
        });

        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);
        router.initialNavigation();
    });

    describe('editForm', () => {
        it('should be invalid when values are empty', () => {
            //by default form control values are empty
            expect(component.editForm?.valid).toBeFalse();
        });

        it('should be invalid when values are present', () => {
            //set form control values
            component.editForm?.controls["firstName"]?.setValue('Janani');
            component.editForm?.controls["lastName"]?.setValue('Ravikumar');;

            expect(component.editForm?.valid).toBeTrue();
        });

        it('should call UpdateInfo method when valid edit form data is submitted', () => {

            const firstName = component.editForm?.controls["firstName"];
            const lastName = component.editForm?.controls["lastName"];
    
            firstName?.setValue('Janani');
            lastName?.setValue('Ravikumar');
    
            component.UpdateUserInfo();
            fixture.detectChanges();
            const navigateSpy = spyOn(router,'navigate');
            expect(component.editForm?.valid).toBeTruthy();
            expect(userService.UpdateInfo).toHaveBeenCalledTimes(1);
            expect(navigateSpy).toHaveBeenCalledWith('welcome');
            //expect(router.navigateByUrl("/welcome")).toHaveBeenCalledTimes(1);
            //check router call.
        });

        
    // it('should call ngOnInit', () => {
    //     //component.ngOnInit();
    //     expect(userService.isAuthenticated).toHaveBeenCalledTimes(1);
    // })

    });



    

    //expect(name?.hasError('required')).toBeTruthy();
})