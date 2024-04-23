import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css']
})
export class DeleteProductModalComponent {
  constructor(private dialogRef: MatDialogRef<DeleteProductModalComponent>) {}

  closeDialog() {
    this.dialogRef.close(false); // Close the dialog without deleting
  }

  deleteProduct() {
 
    this.dialogRef.close(true); // Close the dialog and signal to delete the product
  }
}
