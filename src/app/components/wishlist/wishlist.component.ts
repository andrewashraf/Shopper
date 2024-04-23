import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

import { Icategory } from 'src/app/Models/icategory';
import { Iproduct } from 'src/app/Models/iproduct';
import { PromotionAdsService } from 'src/app/services/PromotionAds.service';
import { storeData } from 'src/app/store-data';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit, OnChanges , OnDestroy{
 
private subscriptions!:Subscription[];// de ma3mola array 3ashan lw 3andna kaza subscription fa han3ml ta7t sub of subs
prdlist:Iproduct[];
prdlistOfCat:Iproduct[]=[]; 
ads: string[] = []; // Array to store ads

@Input() sentCatID:number=0;
@Output() totalPriceChanged:EventEmitter<number>;

orderTotalPrice:number=0;


  OrderDate : Date;
  storeInfo:storeData;
  isImageShow:boolean=true;
observer: any;

// promoAds de 3ashan el a3lan ele hyzhar men el service promotion we subscriptions da array lel subs ele hn3ml feh push lel ads
  constructor(private router:Router , private promoAds:PromotionAdsService ){
this.subscriptions=[];

    this.totalPriceChanged=new EventEmitter<number>();

this.storeInfo=new storeData([1,2,3],
                            ['Majisa','Airfaire','new name'],
                            'https://picsum.photos/200/300',
                            [100,200,300])
                            
     
this.prdlist=[
  {id:1,name:'LenovoThinkpad Laptop',price:10000,quantity:2,imgURL:'https://fakeimg.pl/200/300',CategoryID:1},
  {id:2,name:'HPpro Laptop',price:15000,quantity:1,imgURL:'https://fakeimg.pl/200/300',CategoryID:1},
  {id:3,name:'DELLl Tap',price:20000,quantity:0,imgURL:'https://fakeimg.pl/200/300',CategoryID:2},
  {id:4,name:'Samsung Tap',price:25000,quantity:3,imgURL:'https://fakeimg.pl/200/300',CategoryID:2},
  {id:5,name:'Note 10 ',price:20000,quantity:2,imgURL:'https://fakeimg.pl/200/300',CategoryID:3},
  {id:6,name:'S22 ultra',price:30000,quantity:0,imgURL:'https://fakeimg.pl/200/300',CategoryID:3}
];                    
                         
this.OrderDate=new Date();                            
                            
this.prdlistOfCat=this.prdlist;

                            
}
  
// de m3mola 3ashan el change lama a5tar el category ysma3 m3aya 
  ngOnChanges(): void {
    this.filterProductsByID();
  }
  ngOnInit(): void { // da observable byrturn the ads array ele 7ateno fel pormotionsAds.service
    let observer={
      next:(data:string) => {
        console.log(data);
        this.ads.push("Ad: "+data);
      },
      error:(err:string) => {
        console.log(err);
      },
      complete:() => {
        console.log("Adds Finshed");
      }
    };
    // let adsSubscription = this.promoAds.getScheduledAds(3).subscribe(observer);  part 1 sub

    let filterObservable = this.promoAds.getScheduledAds(2).pipe(
      filter(ad=>ad.includes("White Friday")), // da filter hytla3 ay item fel array feh white friday
      map(ad=>"Ad: "+ad )
    );
    let adsSubscription= filterObservable.subscribe(observer); // part 2 sub with filter

   this.subscriptions.push(adsSubscription) 
  

  // another subscrpion with obserbale " from ()" bt5od array of items ytla3 kolo wara ba3d men 3'er timer
  // we fe observable " of () " by de bt5od list of items msh array
  
  // let sub=this.promoAds.getSerialAds().subscribe(ad=>{
  // console.log(ad);
  // });
  // this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    for (let subscribtion of this.subscriptions){
      subscribtion.unsubscribe();
    }
  }

toggleImage() 
{
  this.isImageShow=!this.isImageShow;

}

private filterProductsByID(){
  if(this.sentCatID==0)
  this.prdlistOfCat= this.prdlist;
else
this.prdlistOfCat=this.prdlist.filter(prd=>prd.CategoryID==this.sentCatID);
}
// changeCat(){
//   this.selectedCatID=1;
// }
buy(prdPrice:number,Count:number){

  // execut lel event emitter total price ele 3amlnaha fo2 3ashan lama ados buy y3'yar fl se3r
  this.totalPriceChanged.emit(this.orderTotalPrice);
  this.orderTotalPrice += Count*prdPrice;

}
// tba3 el satr 285 in wishlist.html
// openPrdDetails(prdID:number){ // m7tagen n3ml injection 3an tare2 el router fa hanro7 lel constructor n3ml router:router
// this.router.navigate(['/Wishlist',prdID]); // 3ashan lama ndos 3ala details btn y7wlna 3ala component details
// }


}