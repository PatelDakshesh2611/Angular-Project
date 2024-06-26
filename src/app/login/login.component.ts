import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService) {}
  
  async onLogin() {
    try {
      // Reset error messages
    this.errorMessage = '';
    this.emailError = '';
    this.passwordError = '';

    // Validate email
    if (!this.email) {
      this.errorMessage = 'Email is required';
    } else if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Invalid email format';
    }

    // Validate password
    if (!this.password) {
      this.errorMessage = 'Password is required';
    } else if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
    }

    // Perform login if no validation errors
    if (!this.emailError && !this.passwordError && !this.errorMessage) {
      const response = await this.authService.login(this.email, this.password);
      console.log('Login successful:', response);
    }
      // Handle successful login, e.g., store token, redirect to dashboard
    } catch (error:any) {
      this.errorMessage = error.error;
      console.error('Login failed:', error);
    }
  }
  isValidEmail(email: string): boolean {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}