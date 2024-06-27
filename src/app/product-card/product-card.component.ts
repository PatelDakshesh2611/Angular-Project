import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../types/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product={
    id: 0,
    title:'',
    description:'',
    price:0,
    rating:0,
    tags:[],
    images:[],
    category:'',
    thumbnail:'',
    quantity:1
  };
  @Output() addToCartClick = new EventEmitter<any>();

  constructor(private router: Router) { }

  onAddToCartClick(event: Event) {
    event.stopPropagation();
    const token = localStorage.getItem('token');
    if (token) {
      this.addToCartClick.emit(this.product);
    } else {
      alert('Please sign up or log in to add products to the cart.');
      this.router.navigate(['/login']);
    }
  }

  onProductClick() {
    this.router.navigate(['/product', this.product.id]);
  }
}
