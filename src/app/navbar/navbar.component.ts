import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatBadge
  ],
  template: `
    <mat-toolbar color="primary">
      <mat-icon class="logo-icon">shopping_cart</mat-icon>
      <span class="title">E-commerce</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/">Home</button>
      <button mat-button routerLink="/products">Products</button>
      <button mat-icon-button routerLink="/cart" aria-label="Cart">
        <mat-icon>shopping_cart</mat-icon>        
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .logo-icon {
      font-size: 36px;
      margin-right: 8px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
    }
    .spacer {
      flex: 1 1 auto;
    }
    mat-toolbar {
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class NavbarComponent {
  
}
