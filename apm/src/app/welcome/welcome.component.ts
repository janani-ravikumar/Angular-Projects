import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  pageTitle:string = 'Home'
  constructor() { }

  ngOnInit(): void {
  }

}
