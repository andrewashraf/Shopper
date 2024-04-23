import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommended-item',
  templateUrl: './recommended-item.component.html',
  styleUrls: ['./recommended-item.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('left', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      state('right', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('* => left', animate('0.5s ease-out')),
      transition('* => right', animate('0.5s ease-out'))
    ]),
  ]
})
export class RecommendedItemComponent implements OnInit {


  displayedItems: any[] = [];
  currentIndex: number = 0;
  itemPerPage: number = 3;
  animateRight: boolean = false; 
  animateLeft: boolean = false;

 recommendedItems = [
    { name: 'Easy Polo Black Edition', price: '$56', imageUrl: '../../../assets/Images/shop_08.jpg', rating: 4 },
    { name: 'Easy Polo Black Edition', price: '$45', imageUrl: '../../../assets/Images/shop_02.jpg', rating: 5 },
    { name: 'Easy Polo Black Edition', price: '$34', imageUrl: '../../../assets/Images/shop_09.jpg', rating: 3 },
    { name: 'Easy Polo Black Edition', price: '$23', imageUrl: '../../../assets/Images/shop_04.jpg', rating: 2 },
    { name: 'Easy Polo Black Edition', price: '$67', imageUrl: '../../../assets/Images/shop_05.jpg', rating: 5 },
    { name: 'Easy Polo Black Edition', price: '$78', imageUrl: '../../../assets/Images/shop_06.jpg', rating: 4 },
    { name: 'Easy Polo Black Edition', price: '$89', imageUrl: '../../../assets/Images/shop_07.jpg', rating: 2 },
    { name: 'Easy Polo Black Edition', price: '$90', imageUrl: '../../../assets/Images/shop_10.jpg', rating: 3 },
    { name: 'Easy Polo Black Edition', price: '$81', imageUrl: '../../../assets/Images/shop_03.jpg', rating: 4 },
    { name: 'Easy Polo Black Edition', price: '$72', imageUrl: '../../../assets/Images/shop_01.jpg', rating: 4 },
    { name: 'Easy Polo Black Edition', price: '$63', imageUrl: '../../../assets/Images/shop_11.jpg', rating: 5 }
  ];
 

  getAnimationClass(index: number): string {
    if (index < this.currentIndex) {
      return 'animate-right';
    } else if (index > this.currentIndex) {
      return 'animate-left';
    } else {
      return '';
    }
  }
  constructor() { }

  ngOnInit() {
    this.updateDisplayedItems();
  }

  updateDisplayedItems() {
    const startIndex = this.currentIndex;
    const endIndex = Math.min(startIndex + this.itemPerPage, this.recommendedItems.length);
    console.log("Start Index:", startIndex, "End Index:", endIndex); // Debug statement
    this.displayedItems = this.recommendedItems.slice(startIndex, endIndex);
    console.log("Displayed Items:", this.displayedItems); // Debug statement
  }
  

  scrollLeft() {
    if (this.currentIndex > 0) { 
      console.log("Before scroll left:", this.currentIndex); // Debug statement
      this.currentIndex--; 
      console.log("After scroll left:", this.currentIndex); // Debug statement
      this.updateDisplayedItems();
      this.animateRight = false;
      this.animateLeft = true;
      setTimeout(() => {
        this.animateLeft = false;
      }, 500);
    }
  }
  

  scrollRight() {
    if (this.currentIndex + this.itemPerPage < this.recommendedItems.length) {
      this.currentIndex++; // Increment currentIndex instead of decrementing it
      this.updateDisplayedItems();
      this.animateLeft = false; // Ensure animation is set to false
      this.animateRight = true; // Set animation to scroll right
      setTimeout(() => {
        this.animateRight = false; // Reset animation after 0.5s
      }, 500);
    }
  }
  rateProduct(item: any, rating: number): void {
    // Here, you can implement logic to update the rating of the selected product
    // For example, you might want to store the rating in a database or update it in-memory
    item.rating = rating;
  }
  getStarsArray(rating: number): number[] {
    const starsArray = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsArray.push(1); // Add a value of 1 for filled stars
      } else {
        starsArray.push(0); // Add a value of 0 for unfilled stars
      }
    }
    return starsArray;
  }

  
}
