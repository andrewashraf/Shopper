import { ChangeDetectorRef, Component, OnInit , ElementRef, HostListener, ViewChild} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { SliderModule } from 'ngx-slider';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute ,Router } from '@angular/router'; // Import ActivatedRoute


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    
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
    ]),
    
    // trigger('slide', [
    //   state('active', style({ transform: 'translateX(0)' })),
    //   state('inactive', style({ transform: 'translateX(100%)' })),
    //   transition('active => inactive', animate('500ms ease-in-out')),
    //   transition('inactive => active', animate('500ms ease-in-out'))
    // ]),

    trigger('slideAnimation', [ // first 3 slides
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('1.5s ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(100%)' }), // if we make translateX(-100%) will reverse direction
        animate('1.5s ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
      ]),
    ])
    
  ]
})


export class HomeComponent implements OnInit {
  
  isSidebarOpen: boolean = false;
  


  products: any[] = [];
  showModal = false;
  OneProduct : any ={};
 
  displayedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6; // Change this value according to your requirement
  totalPages: number = 0;
  pages: number[] = [];
  

  rangeValues: number[] = [0, 600]; // Initial range values
  initialRangeValues: number[] = [0, 600]; // Store initial range values

  
  chunkedRecommendedProducts: any[] = [];
  currentSlide: number = 0;

  
  scrollDirection: 'left' | 'right' = 'left';

  

 
  
  
  
  sliderIndex = 0;
  interval: any;
  

  showBackToTopButton: boolean = false;
  isLoading: boolean=true;
  showSpinner: boolean = true; // Initialize showSpinner to false
  
  spinnerColor = '#e40000';

  

  constructor(public productService: ProductService, private cdr: ChangeDetectorRef , private elementRef: ElementRef,
    private route: ActivatedRoute, private router:Router // Inject ActivatedRoute,
  ) {}

  ngOnInit() {

    // this.showSpinner = true; // Set showSpinner to true when data loading starts
    
    this.getProduct();
  

    this.startSlideShow();

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
   
    
  
}
@HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if user has scrolled down beyond a certain threshold (e.g., 200 pixels)
    this.showBackToTopButton = window.pageYOffset > 200;
  }

scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page smoothly
    }

    getProduct() {
      
      this.productService.getProducts().subscribe(
        (data) => {
          this.products = data;
          this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
          this.updateDisplayedProducts();
          this.generatePageNumbers();
          this.isLoading = false;

        },
        
      );
    }
    
    
    
    
    

  onToggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
  EditProduct(product:any){
    this.OneProduct = product;
    console.log(this.OneProduct);
    
  }

  



  
  
  startSlideShow() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 8000); // Change slide every 5 seconds
  }

  nextSlide() {
    this.sliderIndex = (this.sliderIndex + 1) % 3; // Assuming you have 3 slides
  }

  prevSlide() {
    this.sliderIndex = (this.sliderIndex - 1 + 3) % 3; // Assuming you have 3 slides
  }


  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ChangeProduct(){
    this.productService.editProduct(this.OneProduct.id,this.OneProduct).subscribe(res=>{
      console.log(res);
      
    }) 
  }
  onAddProduct(product: any) {
    // Add the product to your API or perform other actions
    this.products.push(product);

    // Close the modal
  
    this.updateDisplayedProducts();
    this.cdr.detectChanges();
  }
}


