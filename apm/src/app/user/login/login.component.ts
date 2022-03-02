import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{
  @ViewChild('loginForm') loginForm: NgForm | null = null;
  public userName = '';
  public password = ''; 
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
