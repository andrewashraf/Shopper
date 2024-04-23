import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs'; // Import Subscription from rxjs
import { ProductService } from 'src/app/services/product.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isSidebarOpen: boolean = false;
  timer!: number; // Declare a timer variable for hide navbar

  cartItemCount: number = 0; // counter for the items in cart

  @Output() toggleSidebar = new EventEmitter<void>();

  isLogged: boolean = false;
  home: string|any[]|null|undefined;

  private cartItemCountSubscription: Subscription | undefined;
  selectedProduct: any[] = [];
  totalPrice: any;

  constructor(private authService: UserAuthService, private productService: ProductService) {}

  ngOnInit(): void {
    this.authService.getloggedStatus().subscribe(status => {
      this.isLogged = status;
    });

    // Subscribe to changes in the cart item count
    this.productService.cartItemCount.subscribe(count => {
      this.cartItemCount = count;
    });

    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.selectedProduct = JSON.parse(storedCartItems);
      // Calculate total price
      this.totalPrice = this.selectedProduct.reduce((total, product) => total + product.Price, 0);
    }

    // this.hideNavbar(); // Initially hide the navbar

    // // Event listener for mouse movement to show the navbar
    // document.addEventListener('mousemove', () => {
    //   this.showNavbar();
    // });
  }

  removeFromCart(product: any) {
    // Remove the product from the selectedProduct array
    const index = this.selectedProduct.indexOf(product);
    if (index !== -1) {
      this.selectedProduct.splice(index, 1);
      // Update the total price
      this.totalPrice -= product.Price;
      // Update the cart item count
      this.productService.updateCartItemCount(this.selectedProduct.length);
    }
    // Update cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(this.selectedProduct));
  }

  ngOnDestroy(): void {
    // Unsubscribe from the cart item count subscription to prevent memory leaks
    if (this.cartItemCountSubscription) {
      this.cartItemCountSubscription.unsubscribe();
    }
  }

  

  onToggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleSidebar.emit(); // Emit the event to update the sidebar icon
  }
  
}
