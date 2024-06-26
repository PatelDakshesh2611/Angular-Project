// src/app/cart-card/cart-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../types/product';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent {
  @Input() product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    rating: 0,
    tags: [],
    images: [],
    category: '',
    thumbnail: '',
    quantity: 0
  };
  @Output() removeProduct = new EventEmitter<number>();

  onRemoveProduct() {
    this.removeProduct.emit(this.product.id);
  }
}
