import { Component, EventEmitter, Output , NgModule} from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent {
  @Output() addProduct = new EventEmitter<any>() ;
  product: any = {};

  constructor(private productService:ProductService){}

   submitForm() {
     this.addProduct.emit(this.product);
     this.productService.addNewProduct(this.product).subscribe((res:any)=>{      
     })
     

    // Reset the form
    this.product = {};

    // Close the modal
    this.closeModal();
  }

  closeModal() {
    // Close the modal (implement this based on your modal library or Bootstrap)
  
  }
 
}
