// src/app/checkout/checkout.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-checkout',
  standalone:true,
  templateUrl: './checkout.component.html',
  imports:[MatProgressSpinner,MatCard,MatRadioModule,CommonModule,FormsModule],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: any[] = [];
  loading = true;
  selectedPaymentOption: string = 'cod';
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.fetchCart();
  }

  async fetchCart() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      this.loading = false;
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/cart/getUserCart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.products = response.data;
      this.loading = false;
    } catch (error) {
      console.error('Error fetching cart', error);
      this.loading = false;
    }
  }

  getTotalPrice(): number {
    return this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  async placeOrder() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    try {
      await axios.delete('http://localhost:5000/api/cart/clearCart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order placed successfully!');
      this.router.navigate(['/products']);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  }
}
