import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  CurrPrdID:number=0;
  prd:Iproduct |null=null;
  prdService: any;
  prdIDsArr: number[]=[];
  
  constructor(private activatedRoute: ActivatedRoute , private location:Location) { }

  ngOnInit() {
    this.prdIDsArr=this.prdService.getprdIDs();
    // this.CurrPrdID= Number(this.activatedRoute.snapshot.paramMap.get('pid'))
    // console.log(this.CurrPrdID);
    this.activatedRoute.paramMap.subscribe((ParamMap)=>{
    this.CurrPrdID=Number(ParamMap.get('pid'));
    this.prd=this.prdService.getProductbyID(this.CurrPrdID);

    });
    
  }
  goBack(){
    this.location.back();
  }
}
