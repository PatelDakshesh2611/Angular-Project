import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Product } from '../types/product';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product={
    id: 0,
    title:'',
    description:'',
    price:0,
    rating:0,
    tags:[],
    images:[],
    category:'',
    thumbnail:'',
    quantity:0
  };
  loading: boolean = true;
  quantity: number = 1;
  
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.fetchProductDetails(productId);
  }

  fetchProductDetails(productId: string | null) {
    if (!productId) return;
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(response => {
        this.product = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.error('Error fetching product details', error);
        this.loading = false;
      });
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addToCart() {
    
    this.productService.addToCart(this.product, this.quantity)
      .subscribe(
        (response) => {
          console.log('Product added to cart:', response);
          // Handle success, e.g., show a success message or update UI
        },
        (error) => {
          console.error('Error adding to cart:', error);
          // Handle error, e.g., show an error message
        }
      );
  }
  getStars(rating: number): string[] {
    return Array(Math.round(rating)).fill('star');
  }
}
