import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-item-single',
  templateUrl: './item-single.component.html',
  styleUrls: ['./item-single.component.css']
})
export class ItemSingleComponent implements OnInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('productCarousel') productCarousel!: ElementRef;
  productId!: number;
  product: any; // Declare the product property here

  cards = []; // Your card data goes here
  cardWidth = 300; // Adjust according to your card width
  visibleCards = 4; // Number of visible cards at a time
  visibleImgs = 3; // Number of visible cards at a time
  scrollDistance = this.cardWidth * this.visibleCards;
  scrollDistance2 = this.cardWidth * this.visibleImgs;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    // Get the product ID from the route parameter
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      // Fetch the product details using the ProductService
      this.productService.getProductsByID(this.productId).subscribe(product => {
        this.product = product;
      });
    });
  }

  scrollCarousel(direction: 'prev' | 'next') {
    const scrollValue = direction === 'prev' ? -this.scrollDistance : this.scrollDistance;
    this.carousel.nativeElement.scrollBy({ left: scrollValue, behavior: 'smooth' });
  }
  
  scrollCarousel2(direction: 'prevv' | 'nextt') {
    const scrollValue = direction === 'prevv' ? -this.scrollDistance2 : this.scrollDistance2;
    this.productCarousel.nativeElement.scrollBy({ left: scrollValue, behavior: 'smooth' });
  }
  
  addToCart(product: any) {
    // Retrieve cart items from local storage
    const storedCartItems = localStorage.getItem('cartItems');
    let existingCartItems: any[] = [];
    if (storedCartItems) {
      existingCartItems = JSON.parse(storedCartItems);
    }
  
    // Add the new product to the existing cart items
    existingCartItems.push(product);
  
    // Update the cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
  }

}
