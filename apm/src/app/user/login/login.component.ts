import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ILoginFormValues } from './login-form-values';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  public userName: any;
  public password: any; 
  private homepageUrl = "/welcome";
  constructor(private userService: UserService, private router: Router) { }

  login(formValues: ILoginFormValues) {
    this.userService.login(formValues.userName, formValues.password)
    this.router.navigate([this.homepageUrl])
  }

  cancel() {
    this.router.navigate([this.homepageUrl]);
  }
}
