  import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';


  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { NavbarComponent } from './components/navbar/navbar.component';
  import { HomeComponent } from './components/home/home.component';
  import { AccountComponent } from './components/account/account.component';
  import { LoginComponent } from './components/login/login.component';
  import { CardComponent } from './components/card/card.component';
  import { WishlistComponent } from './components/wishlist/wishlist.component';
  import { CheckoutComponent } from './components/checkout/checkout.component';
  import { HeaderComponent } from './components/header/header.component';
  import { FooterComponent } from './components/footer/footer.component';
  import { HttpClientModule } from '@angular/common/http';
  import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
  import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
  import { LightboxDirective } from './Directives/lightbox.directive';
  import { USDtoEGPPipe } from './Pipes/usdto-egp.pipe';
  import { NotFoundComponent } from './components/not-found/not-found.component';
  import { MainLayoutComponent } from './components/main-layout/main-layout.component';
  import { ProductDetailsComponent } from './components/product-details/product-details.component';

  import { UserRegisterComponent } from './components/user-register/user-register.component';
  import { CardModule } from 'primeng/card';
  import { TableModule } from 'primeng/table';
  import { CheckboxModule } from 'primeng/checkbox';
  import { ButtonModule } from 'primeng/button';
  import { InputTextModule } from 'primeng/inputtext';
  import { PaginatorModule } from 'primeng/paginator';
  import { DialogModule } from 'primeng/dialog';
  import { SliderModule } from 'primeng/slider';
  import { CarouselModule } from 'primeng/carousel';
  import { RecommendedItemComponent } from './components/recommended-item/recommended-item.component';
  import { CategoryTabsComponent } from './components/category-tabs/category-tabs.component';
  import { FeaturesItemsComponent } from './components/features-items/features-items.component';
  import { MatDialogModule } from '@angular/material/dialog';
  import { SidebarComponent } from './components/sidebar/sidebar.component';
  import { ChartModule } from 'primeng/chart';
  import { FloatLabelModule } from 'primeng/floatlabel';
  import { ItemSingleComponent } from './components/item-single/item-single.component';
  import { ProgressSpinnerModule } from 'primeng/progressspinner';
  import { NgxSpinnerModule } from "ngx-spinner";
  import { CartComponent } from './components/cart/cart.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

  @NgModule({
    declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
      AccountComponent,
      LoginComponent,
      CardComponent,
      WishlistComponent,
      CheckoutComponent,
      HeaderComponent,
      FooterComponent,
      AddProductModalComponent,
      DeleteProductModalComponent,
      EditProductModalComponent,
      LightboxDirective,
      USDtoEGPPipe,
      NotFoundComponent,
      MainLayoutComponent,
      ProductDetailsComponent,
      UserLoginComponent,
      UserRegisterComponent,
      RecommendedItemComponent,
      CategoryTabsComponent,
      FeaturesItemsComponent,
      SidebarComponent,
      ItemSingleComponent,
      CartComponent,
      ProfileComponent,
      DashboardComponent
      
      
    ],

    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
    
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      CardModule,
      TableModule,
      CheckboxModule,
      ButtonModule,
      InputTextModule,
      PaginatorModule,
      DialogModule,
      BrowserAnimationsModule,
      SliderModule,
      CarouselModule,
      MatDialogModule,
      ChartModule,
      FloatLabelModule,
      ProgressSpinnerModule,
      NgxSpinnerModule
      
      
      
    ],
    providers: [],
    bootstrap: [AppComponent]

    
    
  })
  export class AppModule { }
