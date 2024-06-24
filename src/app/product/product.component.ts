// product.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product',
  imports:[FormsModule,CommonModule,ProductCardComponent],
  templateUrl: './product.component.html',
  standalone:true,
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor() { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        this.products = response.data.products;
      })
      .catch(error => {
        console.error('Error fetching products', error);
      });
  }

  addToCart(product: any) {
    console.log('Product added to cart:', product);
    // Implement your cart logic here
  }
}