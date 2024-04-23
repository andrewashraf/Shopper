import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Icategory } from 'src/app/Models/icategory';
import { WishlistComponent } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit,AfterViewInit {
  catlist:Icategory[];
  selectedCatID:number=0;
  receivedOrderTotalPrice:number=0;
 

 @ViewChild('clientNameInp') clientNameInpElem!:ElementRef; // telling him tha the client name will not be =null
 @ViewChild(WishlistComponent) wishListCompObj! : WishlistComponent;
constructor(){
  this.catlist=[{id:1,name:'Laptops'},{id:2,name:'Tablets'},{id:3,name:'Mobiles'},];   
}
  ngAfterViewInit(): void { // de m3mlola 3ashan lma el client ykteb esmo yzhar fa da kda ba3d el view bta3 el page
    this.clientNameInpElem.nativeElement.value="Your Name Here";
    this.clientNameInpElem.nativeElement.style.border="2px solid red";
    //console.log(this.wishListCompObj.prdlist); da 3amlna object men wishlist component 3ashan n2dar nshof ay 7aga men componenet tanya
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onTotalPriceChanged(totalPrice:number){
    this.receivedOrderTotalPrice=totalPrice;
  }

  completeOrder(){
    // for test 
    this.wishListCompObj.prdlist[0].quantity-=1;
  }
}
