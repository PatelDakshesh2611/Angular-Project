import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../types/product';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatDialogModule],
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

  constructor(private dialog: MatDialog) {}

  onRemoveProduct() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeProduct.emit(this.product.id);
      }
    });
  }
}
