import { ChangeDetectorRef, Component, ElementRef, OnInit, } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Params, Route, Router } from '@angular/router';
import { Colors } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';

@Component({
  selector: 'app-features-items',
  templateUrl: './features-items.component.html',
  styleUrls: ['./features-items.component.css'],
  animations : [
    trigger('pageChange', [
      transition('void => increment', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('void => decrement', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('* => void', [
        animate('0.3s ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('productAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('800ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('800ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])

  ]
})
export class FeaturesItemsComponent implements OnInit {

  displayedProducts: any[] = [];
  products: any[] = [];
  totalPages: number = 0;
  itemsPerPage: number = 6; // Change this value according to your requirement
  rangeValues: number[] = [0, 600]; // Initial range values
  initialRangeValues: number[] = [0, 600]; // Store initial range values
  currentPage: number = 1;
  pages: number[] = [];
  OneProduct : any ={};
  showModal = false;

  productId!: number;
  product: any; // Assuming you have a Product interface or type
  

 

  constructor(public productService: ProductService
    , private dialog: MatDialog
    , private cdr: ChangeDetectorRef 
    , private elementRef: ElementRef
    ,private route: ActivatedRoute // Add this line, 
    ,private router: Router
  ) { 

  }

  ngOnInit() {
    this.getProduct();
    this.updateDisplayedProducts();

    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.productId = id;
        // Fetch the product details using the ProductService
        this.productService.getProductsByID(this.productId).subscribe(product => {
          this.product = product;
        });
      } else {
        // Handle the case where the id parameter is not a valid number
        // For example, redirect to a default page or display an error message
      }
    });
  

  }
  getProduct() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.updateDisplayedProducts();
        this.generatePageNumbers();
        this.cdr.detectChanges();
      }
    );
  }

  updateDisplayedProducts() {
    // Filter products based on price range
    const filteredProducts = this.products.filter(product => {
      return product.Price >= this.rangeValues[0] && product.Price <= this.rangeValues[1];
    });

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, filteredProducts.length);

    // Update displayed products
    this.displayedProducts = filteredProducts.slice(startIndex, endIndex);
  }
//   updateDisplayedProducts() {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     let endIndex = startIndex + this.itemsPerPage;

//     // Check if endIndex exceeds the total number of products
//     if (endIndex > this.products.length) {
//         endIndex = this.products.length;
//     }

//     this.displayedProducts = this.products.slice(startIndex, endIndex);
// }


  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedProducts();
    }
  }

  // Your other methods like onAddProduct, onDeleteProduct, EditProduct, ChangeProduct, etc. go here

  onRangeChange(event: any) {
    this.rangeValues = event.values; // Assuming the range values are in the 'values' property
    this.updateDisplayedProducts();
  }


  onAddProduct(product: any) {
    // Add the product to your API or perform other actions
    this.products.push(product);

    // Close the modal
  
    this.updateDisplayedProducts();
    this.cdr.detectChanges();
  }
// the old one without confirmation for delte product |
  // onDeleteProduct(productid: number, index:number) {
  //   this.productService.deleteProduct(productid).subscribe(res=>{
      
  //     this.products.splice(index,1);
  //     this.updateDisplayedProducts();
     
  //   });
  
  // }
  confirmDelete(productId: number, index: number) {
    const confirmation = confirm("Are you sure you want to delete this product?");
    if (confirmation) {
      this.productService.deleteProduct(productId).subscribe(res => {
        // Product deleted successfully, remove it from the list
        this.products.splice(index, 1);
        this.updateDisplayedProducts();
      });
    }
  }
  

  EditProduct(product:any){
    this.OneProduct = product;
    console.log(this.OneProduct);
    
  }
  handleEdit(product: any) {
    // Call the service method to update the product
    this.productService.editProduct(product.id, product).subscribe(res => {
      console.log('Product edited successfully:', res);
      // Optionally, perform any additional actions after editing the product
    }, error => {
      console.error('Error editing product:', error);
      // Optionally, handle the error
    });

  }

  openEditModal(product: any) {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '400px',
      data: { productId: product.id, product: { ...product } }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if needed
        console.log('Product updated:', result);
      }
    });
  }
  // openEditProductModal(product: any) {
  //   const dialogRef = this.dialog.open(EditProductModalComponent, {
  //     width: '400px',
  //     data: { product: { ...product } }
  //   }
  // }

  ChangeProduct() {
    this.productService.editProduct(this.OneProduct.id, this.OneProduct).subscribe(res => {
      console.log(res);
      // Close the dialog
      // dialogRef.close(); // Uncomment this line if you need to close the dialog
    });
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

  likeProduct(product: any) {
    // Toggle the liked status of the product
    product.liked = !product.liked;
  
    // Increase or decrease the number of likes based on the liked status
    if (product.liked) {
      product.likes += 1; // Increase likes by 1
    } else {
      product.likes -= 1; // Decrease likes by 1
    }
  }
  


}
