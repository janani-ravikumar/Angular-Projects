import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  public userName: any;
  public password: any; 
  private readonly homepageUrl = "/welcome";
  constructor(private readonly userService: UserService, private readonly router: Router) { }

  public login() {
    this.userService.login(this.userName, this.password)
    this.router.navigate([this.homepageUrl])
  }

  public cancel() {
    this.router.navigate([this.homepageUrl]);
  }
}
