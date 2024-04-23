import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-tabs',
  templateUrl: './category-tabs.component.html',
  styleUrls: ['./category-tabs.component.css'],
  animations: [
    trigger('tabAnimation', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.8s ease-in')
      ]),
      transition('* => void', [
        animate('0.8s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CategoryTabsComponent implements OnInit {

  activeGroupId: string = 'tshirt'; // for showgroup()

  groups = [
    {
      id: 'tshirt',
      products: [
        { name: 'T-Shirt 1', price: '$20', imageUrl: '../../../assets/Images/shop_02.jpg' },
        { name: 'T-Shirt 2', price: '$25', imageUrl: '../../../assets/Images/shop_11.jpg' },
        { name: 'T-Shirt 3', price: '$30', imageUrl: '../../../assets/Images/shop_09.jpg' },
        { name: 'T-Shirt 4', price: '$35', imageUrl: '../../../assets/Images/shop_06.jpg' },
        // Add more products for T-Shirt group
      ]
    },
    {
      id: 'blazers',
      products: [
        { name: 'Blazer 1', price: '$50', imageUrl: '../../../assets/Images/shop_07.jpg' },
        { name: 'Blazer 2', price: '$55', imageUrl: '../../../assets/Images/product1.jpg' },
        { name: 'Blazer 3', price: '$60', imageUrl: '../../../assets/Images/shop_06.jpg' },
        { name: 'Blazer 4', price: '$65', imageUrl: '../../../assets/Images/shop_05.jpg' },
        { name: 'Blazer 5', price: '$70', imageUrl: '../../../assets/Images/shop_04.jpg' },
        { name: 'Blazer 6', price: '$75', imageUrl: '../../../assets/Images/shop_01.jpg' },
        // Add more products for Blazers group  
      ]
    },
    {
      id: 'sunglass',
      products: [
        { name: 'Sunglass 1', price: '$22', imageUrl: '../../../assets/Images/product2.jpg' },
        { name: 'Sunglass 2', price: '$30', imageUrl: '../../../assets/Images/shop_01.jpg' },
        { name: 'Sunglass 3', price: '$40', imageUrl: '../../../assets/Images/shop_09.jpg' },
        // Add more products for T-Shirt group
      ]
    },
    {
      id: 'kids',
      products: [
        { name: 'Kids 1', price: '$26', imageUrl: '../../../assets/Images/shop_08.jpg' },
        { name: 'Kids 2', price: '$39', imageUrl: '../../../assets/Images/shop_08.jpg' },
        // Add more products for T-Shirt group
      ]
    },
    {
      id: 'poloshirt',
      products: [
        { name: 'Polo Shirt 1', price: '$22', imageUrl: '../../../assets/Images/shop_04.jpg' },
        { name: 'Polo Shirt 2', price: '$31', imageUrl: '../../../assets/Images/shop_04.jpg' },
        { name: 'Polo Shirt 3', price: '$27', imageUrl: '../../../assets/Images/shop_04.jpg' },
        { name: 'Polo Shirt 4', price: '$39', imageUrl: '../../../assets/Images/shop_04.jpg' },
        // Add more products for T-Shirt group
      ]
    },
  ];

  constructor() { }

  ngOnInit() {
  }


  showGroup(groupId: string) {
    this.activeGroupId = groupId;
  }

  isActiveGroup(groupId: string): string {
    return this.activeGroupId === groupId ? 'in' : 'void';
  }
}
