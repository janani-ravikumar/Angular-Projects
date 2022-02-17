import { Injectable } from '@angular/core';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public currentUser!: IUser | null;
    
  login(userName: string, password: string) {
    this.currentUser = {
      id : 1,
      firstName: userName,
      lastName: ''
    }
  }

  isAuthenticated() {
    return Boolean(this.currentUser);
  }

  UpdateInfo(firstName: string, lastName: string) {
    this.currentUser = {
      id : 1,
      firstName: firstName,
      lastName: lastName
    }
  }
}
