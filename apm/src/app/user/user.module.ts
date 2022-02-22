import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent},
      { path: 'edit', component: UserComponent}
    ])
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
