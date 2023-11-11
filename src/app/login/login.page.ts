import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../firebase.auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  showForgotPasswordForm = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  navigateToTabs() {
    this.router.navigateByUrl('/tabs/tab1');
  }

  navigateToRegister() {
    this.router.navigateByUrl('/signup');
  }

  login() {
    this.errorMessage = '';
    this.successMessage = '';
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.signIn(email, password).then(
        (user: any) => {
          console.log('Logged in:', user);
          this.navigateToTabs();
        }
      ).catch(error => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed: ' + error.message;
      });
    } else {
      this.errorMessage = 'Please check your entries and try again.';
    }
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';
  
    const email = this.forgotPasswordForm.get('email')?.value;
    if (email) {
      this.authService.sendPasswordResetEmail(email).then(() => {
        this.successMessage = 'Password reset email sent successfully. Please check your inbox.';
        // Consider adding a delay before hiding the form to let the user see the message
        setTimeout(() => {
          this.showForgotPasswordForm = false; 
        }, 2000); // Wait for 3 seconds before hiding the form
      }).catch(error => {
        this.errorMessage = 'Password reset failed: ' + error.message;
      });
    } else {
      this.errorMessage = 'Please enter a valid email address.';
    }
  }
  
  
  toggleForgotPasswordForm() {
    this.showForgotPasswordForm = !this.showForgotPasswordForm;
    // Reset the forgot password form and messages
    this.forgotPasswordForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }
}
