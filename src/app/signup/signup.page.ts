import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../firebase.auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signupForm: FormGroup;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], // Validators should be in an array
      confirmPassword: ['', Validators.required]
    });
  }

  navigateToTabs() {
    this.router.navigateByUrl('/tabs/tab1');
  }

  navigateToSignIn() {
    this.router.navigateByUrl('/login');
  }

  onSignup() {
    // Clear previous error messages
    this.errorMessage = '';
    this.successMessage = '';
  
    // First, check if form fields are valid
    if (!this.signupForm.valid) {
      // You can loop over the form controls to find which one is invalid
      // and set an appropriate error message
      const formControls = this.signupForm.controls;
      for (const name in formControls) {
        if (formControls[name].invalid) {
          switch (name) {
            case 'name':
              if (formControls[name].errors?.['minlength']) {
                this.errorMessage = 'Name must be at least 3 characters.';
              }
              break;
            case 'email':
              this.errorMessage = 'Please enter a valid email.';
              break;
            case 'password':
              if (formControls[name].errors?.['minlength']) {
                this.errorMessage = 'Password must be at least 8 characters.';
              }
              break;
            // add more cases for other form controls if needed
          }
          // Stop checking if any error is found
          if (this.errorMessage) break;
        }
      }
      // If an error message is set, don't proceed with signup
      if (this.errorMessage) return;
    }
  
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
  
    // Ensure password and confirm password are the same
    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
  
    const name = this.signupForm.get('name')?.value;
    const email = this.signupForm.get('email')?.value;
  
    // Handle signup logic here
    this.authService.signUp(name, email, password).then(
      (userCredential: any) => {
        this.successMessage = 'Signup successful';
        console.log('Signed up:', userCredential);
        // Navigate to tabs page after signup
        this.navigateToTabs();
      },
      (error: any) => {
        console.error('Signup error:', error);
        this.errorMessage = 'Signup failed: ' + error.message;
      }
    );
  }
  
}
