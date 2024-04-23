import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UserLoginComponent } from '../app/components/user-login/user-login.component';
import { AuthGuard } from './components/Guards/auth.guard';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { ItemSingleComponent } from './components/item-single/item-single.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {path:'', component:MainLayoutComponent,children:[

    {path:"" , redirectTo:'/home',pathMatch:'full'}, // default path
    {path:"home" , component:HomeComponent},
    {path:"Account" , component:AccountComponent,canActivate:[AuthGuard]},
    {path:"profile" , component:ProfileComponent,canActivate:[AuthGuard]},
    {path:"Checkout" , component:CheckoutComponent,canActivate:[AuthGuard]},
    {path:"Login" , component:LoginComponent},
    {path:"UserLogin" , component:UserLoginComponent},
    {path:"UserLogout" , component:UserLoginComponent},
    {path:"UserRegister" , component:UserRegisterComponent},
    // {path:"itemsingle," , component:ItemSingleComponent},

  ]},
  {path:"ItemSingle/:id" , component:ItemSingleComponent},
  {path:"Card" , component:CardComponent,canActivate:[AuthGuard]},
  {path:"Cart" , component:CartComponent,canActivate:[AuthGuard]},
  {path:"Wishlist" , component:WishlistComponent,canActivate:[AuthGuard]},
  {path:"Wishlist/:pid" , component:ProductDetailsComponent},
  
  //  {path:"**", component:NotFoundComponent} // wildcard path NFound
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
