// product-card.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() addToCartClick = new EventEmitter<any>();

  constructor() { }

  onAddToCartClick() {
    this.addToCartClick.emit(this.product);
  }
}