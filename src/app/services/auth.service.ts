import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private tokenSubject: BehaviorSubject<string | null>;

  constructor() {
    const initialToken = this.getTokenFromLocalStorage();
    this.tokenSubject = new BehaviorSubject<string | null>(initialToken);
  }

  async signup(name: string, email: string, password: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/signup`, { name, email, password });
      const token = response.data.token;
      this.setTokenInLocalStorage(token);
      this.tokenSubject.next(token); // Emit new token value
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, { email, password });
      const token = response.data.token;
      this.setTokenInLocalStorage(token);
      this.tokenSubject.next(token); // Emit new token value
      return response.data;
    } catch (error:any) {
      throw error.response.data;
    }
  }

  getToken(): string | null {
    return this.getTokenFromLocalStorage();
  }

  token$() {
    return this.tokenSubject.asObservable();
  }

  logout() {
    this.removeTokenFromLocalStorage();
    this.tokenSubject.next(null); // Emit null to signify logout
  }

  private getTokenFromLocalStorage(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    console.warn('localStorage is not available.');
    return null;
  }

  private setTokenInLocalStorage(token: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
    } else {
      console.warn('localStorage is not available.');
    }
  }

  async checkToken(token: string) {
    try {
      const response = await axios.post(`${this.apiUrl}/auth/checkToken`, { token });
      return response.data;
    } catch (error) {
      console.log(error)
      localStorage.removeItem('token')
    }
  }

  private removeTokenFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    } else {
      console.warn('localStorage is not available.');
    }
  }
}
