import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { MoviesService } from './movies.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'movies', component: MoviesComponent }
    ])
  ],
  providers: [
    MoviesService
  ]
})
export class MoviesModule { }
