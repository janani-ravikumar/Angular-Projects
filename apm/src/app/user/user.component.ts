import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'pm-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  editForm!: FormGroup;
  firstName!: FormControl;
  lastName!: FormControl;
  homepageUrl: string = "/welcome";
  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.firstName = new FormControl(
      this.userService.currentUser?.firstName, Validators.required
    );
    this.lastName = new FormControl(
      this.userService.currentUser?.lastName, Validators.required
    );

    this.editForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  cancel() {
    this.router.navigate([this.homepageUrl]);
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }

  validateLastName() {
    return this.lastName.valid;
  }

  UpdateUserInfo(formValues: { firstName: string; lastName: string; }) {
    if(this.editForm.valid) {
      this.userService.UpdateInfo(formValues.firstName, formValues.lastName)
      this.router.navigateByUrl(this.homepageUrl)
    }
  }
}
