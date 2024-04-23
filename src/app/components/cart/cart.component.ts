import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  selectedProduct: any[] = []; // Ensure selectedProduct property is declared here
  totalPrice: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Retrieve cart items from local storage
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.selectedProduct = JSON.parse(storedCartItems);
      // Calculate total price
      this.totalPrice = this.selectedProduct.reduce((total, product) => total + product.Price, 0);
    }
  }

  removeFromCart(product: any) {
    // Remove the product from the selectedProduct array
    const index = this.selectedProduct.indexOf(product);
    if (index !== -1) {
      this.selectedProduct.splice(index, 1);
      // Update the total price
      this.totalPrice -= product.Price;
    }
    // Update cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(this.selectedProduct));
  }
  

}
