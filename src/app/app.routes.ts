import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component:ProductComponent },
  {path:'product/:id',component:ProductDetailsComponent},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {path:'',component:HomeComponent},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];
