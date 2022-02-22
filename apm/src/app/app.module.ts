import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductModule } from './products/product.module';
import { NavigationComponent } from './welcome/navigation.component';
import { UserModule } from './user/user.module';
import { MoviesModule } from './movies/movies.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent},
      { path: '', redirectTo: 'welcome', pathMatch: 'full'},
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
   ]),
    ProductModule,
    UserModule,
    MoviesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }