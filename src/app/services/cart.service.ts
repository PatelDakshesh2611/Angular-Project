// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:5000/api/cart';

  async getUserCart() {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`${this.baseUrl}/getUserCart`, config);
    return response.data;
  }

  async removeProductFromCart(productId: number) {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.delete(`${this.baseUrl}/removeProduct/${productId}`, config);
    return response.data;
  }
}
