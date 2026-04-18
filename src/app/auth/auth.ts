import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  isLoginMode = true;

  loginForm = {
    email: '',
    password: '',
  };

  registerForm = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.resetForms();
  }

  resetForms() {
    this.loginForm = { email: '', password: '' };
    this.registerForm = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onLogin() {
    if (!this.loginForm.email || !this.loginForm.password) {
      console.log('Please fill in all fields');
      return;
    }
    console.log('Login Attempt:', this.loginForm);
    // Handle login logic here
    this.loginForm = { email: '', password: '' };
  }

  onRegister() {
    if (
      !this.registerForm.fullName ||
      !this.registerForm.email ||
      !this.registerForm.password ||
      !this.registerForm.confirmPassword
    ) {
      console.log('Please fill in all fields');
      return;
    }

    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    console.log('Register Attempt:', {
      fullName: this.registerForm.fullName,
      email: this.registerForm.email,
    });
    // Handle registration logic here
    this.registerForm = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }
}
