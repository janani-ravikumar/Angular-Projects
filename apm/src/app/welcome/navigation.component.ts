import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'pm-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent{
  public pageTitle = 'My Angular App';

  constructor(public userService: UserService) { }
}
