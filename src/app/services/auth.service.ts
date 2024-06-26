import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  async signup(name: string, email: string, password: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/signup`, { name, email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in localStorage
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in localStorage
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token'); // Remove token from localStorage on logout
  }
}