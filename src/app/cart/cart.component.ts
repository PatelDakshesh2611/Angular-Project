// src/app/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CartService } from '../services/cart.service';
import { CartCardComponent } from '../cart-card/cart-card.component';
import { Product } from '../types/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, CartCardComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;

  constructor(private cartService: CartService,private router:Router) { }

  ngOnInit() {
    this.fetchUserCart();
  }

  async fetchUserCart() {
    try {
      this.loading = true;
      this.products = await this.cartService.getUserCart();
    } catch (error) {
      console.error('Error fetching user cart:', error);
    } finally {
      this.loading = false;
    }
  }

  async removeProduct(productId: number) {
    try {
      await this.cartService.removeProductFromCart(productId);
      this.products = this.products.filter(product => product.id !== productId);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  }

  getTotalPrice(): number {
    return this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }
  
  onCheckout() {
    this.router.navigate(['/checkout']);
  }
}
