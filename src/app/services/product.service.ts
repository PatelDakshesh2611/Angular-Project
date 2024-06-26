import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api'; // Replace with your backend URL

  constructor() { }

  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getProductDetails(productId: string): Observable<any> {
    return new Observable<any>(observer => {
      axios.get(`${this.baseUrl}/products/${productId}`)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  addToCart(product: Product, quantity: number): Observable<any> {
    const token = this.getAuthToken();

    if (!token) {
      return throwError({ message: 'User is not authenticated' });
    }

  
    return new Observable<any>(observer => {
      axios.post(`${this.baseUrl}/cart/addOrUpdateProduct`, {...product,quantity}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        observer.next(response.data);
        alert('Product added to cart')
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    }).pipe(
      catchError(error => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access
          alert('You are not logged in. Please log in to add items to cart.');
        }
        return throwError(error);
      })
    );
  }
}
