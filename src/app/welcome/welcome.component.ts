import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  title = 'Welcome to the Financial Planner Application';
  buttonText = 'Proceed'

  constructor(public routing: Router) {

  }

  goToHome() {
    this.routing.navigateByUrl("/home");
  }

}
