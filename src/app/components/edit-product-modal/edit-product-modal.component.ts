import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent {
  @Output() editProduct = new EventEmitter<any>();
  product: any = {};
  productId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditProductModalComponent>,
    private productService: ProductService
  ) {
    this.productId = data.productId;
    this.product = { ...data.product }; // Copy product data to avoid modifying the original object
  }

  submitForm() {
    // Emit the edited product to the parent component
    this.editProduct.emit(this.product);
  
    // Call the service method to update the product
    this.productService.editProduct(this.product.id, this.product).subscribe(
      (res) => {
        console.log('Product edited successfully:', res);
        // Close the modal after saving the changes
        this.closeModal();
      },
      (error) => {
        console.error('Error editing product:', error);
        // Optionally, handle the error
      }
    );
  }
  
  closeModal() {
    // Close the modal (implement this based on your modal library or Bootstrap)
    this.dialogRef.close();
  }
  
  saveChanges() {
    this.productService.editProduct(this.productId, this.product).subscribe(
      (res) => {
        console.log('Product updated successfully:', res);
        this.dialogRef.close(res); // Close the modal with the updated product data
      },
      (error) => {
        console.error('Error editing product:', error);
        // Handle the error if needed
      }
    );
  }

  openEditModal(product: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px'; // Set the width to your desired size
    dialogConfig.data = product;
  
    const dialogRef = this.dialog.open(EditProductModalComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Handle the result here if needed
      }
    });
  }


}
