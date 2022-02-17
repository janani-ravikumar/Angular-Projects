import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public editForm!: FormGroup;
  private firstName!: FormControl;
  private lastName!: FormControl;
  private readonly homepageUrl = "/welcome";
  constructor(private readonly userService: UserService, private readonly router: Router) { }
  
  public get FirstName() {
    return this.firstName.value;
  }

  public get LastName() {
    return this.lastName.value;
  }

  ngOnInit(): void {
    this.firstName = new FormControl(
      this.userService.currentUser?.firstName ?? '', Validators.required
    );
    this.lastName = new FormControl(
      this.userService.currentUser?.lastName ?? '', Validators.required
    );

    this.editForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  public cancel() {
    this.router.navigate([this.homepageUrl]);
  }

  public UpdateUserInfo() {
    if (this.editForm.valid) {
      var editFormValue = this.editForm.value;
      this.userService.UpdateInfo(editFormValue?.firstName, editFormValue?.lastName)
      this.router.navigateByUrl(this.homepageUrl)
    }
  }
}
