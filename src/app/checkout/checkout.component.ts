import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import axios from 'axios';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: any[] = [];
  loading = true;
  selectedPaymentOption: string = 'cod';
  addressForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

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
    if (this.addressForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    const address = this.addressForm.value.address;
    const city = this.addressForm.value.city;
    const state = this.addressForm.value.state;
    const totalPrice = this.getTotalPrice();

    try {
      await axios.delete('http://localhost:5000/api/cart/clearCart', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const doc = new jsPDF();
      let yPosition = 10;

      doc.setFontSize(16);
      doc.text('Tej-Mart Invoice', 10, yPosition);
      yPosition += 10;

      doc.setFontSize(12);
      doc.text(`Address: ${address}`, 10, yPosition);
      yPosition += 10;
      doc.text(`City: ${city}`, 10, yPosition);
      yPosition += 10;
      doc.text(`State: ${state}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Total Price: ${totalPrice.toFixed(2)}`, 10, yPosition);
      yPosition += 10;

      this.products.forEach((product, index) => {
        yPosition += 10;
        doc.text(`Product ${index + 1}: ${product.title}`, 10, yPosition);
        yPosition += 5;
        doc.text(`Price: ${product.price.toFixed(2)}`, 20, yPosition);
        yPosition += 5;
        doc.text(`Quantity: ${product.quantity}`, 20, yPosition);
      });

      // Ensure there is enough spacing between product lines
      yPosition += 10;

      doc.save('invoice.pdf');

      alert('Order placed successfully!');
      this.router.navigate(['/products']);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  }

  getAddressErrorMessage() {
    const address = this.addressForm.get('address');
    if (address?.hasError('required')) {
      return 'You must enter an address';
    }
    if (address?.hasError('minlength')) {
      return 'Address must be at least 5 characters long';
    }
    return '';
  }

  getCityErrorMessage() {
    const city = this.addressForm.get('city');
    if (city?.hasError('required')) {
      return 'You must enter a city';
    }
    if (city?.hasError('minlength')) {
      return 'City must be at least 2 characters long';
    }
    return '';
  }

  getStateErrorMessage() {
    const state = this.addressForm.get('state');
    if (state?.hasError('required')) {
      return 'You must enter a state';
    }
    if (state?.hasError('minlength')) {
      return 'State must be at least 2 characters long';
    }
    return '';
  }
}
