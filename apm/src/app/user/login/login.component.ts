import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  userName: any;
  password: any; 
  homepageUrl: string = "/welcome";
  constructor(private userService: UserService, private router: Router) { }

  login(formValues: any) {
    this.userService.login(formValues.userName, formValues.password)
    this.router.navigate([this.homepageUrl])
  }

  cancel() {
    this.router.navigate([this.homepageUrl]);
  }
}
