// product.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../types/product';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product',
  imports:[FormsModule,CommonModule,ProductCardComponent,MatSpinner],
  templateUrl: './product.component.html',
  standalone:true,
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  loading: boolean = true; // Flag to track loading state

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        this.products = response.data.products;
        this.loading = false; // Set loading to false after products are fetched
      })
      .catch(error => {
        console.error('Error fetching products', error);
        this.loading = false; // Set loading to false on error as well
      });
  }

  addToCart(product: Product) {
    console.log('Adding product to cart:', product);
    this.productService.addToCart(product, 1).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        // Handle success or show notification
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        // Handle error or show error message
      }
    );
  }
}
