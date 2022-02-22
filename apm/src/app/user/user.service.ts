import { Injectable } from '@angular/core';
import { IUser } from './user';

@Injectable()

export class UserService {

  public currentUser: IUser | null = null;
    
  public login(userName: string, password: string) {
    this.currentUser = {
      id : 1,
      firstName: userName,
      lastName: ''
    }
  }

  public isAuthenticated() : boolean {
    return this.currentUser !== null;
  }

  public UpdateInfo(firstName: string, lastName: string): void {
    if (this.currentUser !== null) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    }
  }
}
