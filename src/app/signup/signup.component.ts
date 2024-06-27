import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  async onSignup() {
    try {
      this.errorMessage = '';
      if (!this.name || !this.email || !this.password) {
        this.errorMessage = 'Please fill out all required fields.';
        return;
      }

      if (!this.isValidEmail(this.email)) {
        this.errorMessage = 'Invalid email format.';
        return;
      }

      if (this.password.length < 6) {
        this.errorMessage = 'Password must be at least 6 characters long.';
        return;
      }

      const response = await this.authService.signup(this.name, this.email, this.password);
      console.log('Signup successful:', response);
      this.snackBar.open('Signup successful!', 'Close', {
        duration: 3000,
      });
      this.router.navigate(['/products']);
    } catch (error: any) {
      this.errorMessage = error.error;
      console.error('Signup failed:', error);
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
