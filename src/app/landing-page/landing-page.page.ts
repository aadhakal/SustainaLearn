import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage {

  constructor(private router: Router) { }

  navigateToLogin() {
    console.log('navigateToLogin called');
    this.router.navigateByUrl('/login');
  }
  
  navigateToSignup() {
    console.log('navigateToSignup called');
    this.router.navigateByUrl('/signup');
  }
  

}
