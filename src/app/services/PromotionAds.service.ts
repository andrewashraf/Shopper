import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionAdsService {
  private adsList: string[];

  constructor() { 
    this.adsList = ["Big Discounts", "Sale up to 50%","1", "Watch our White Friday Offers", "Special White Friday 70% off"];
  }

  getScheduledAds(intervalInSeconds: number): Observable<string> {
    return new Observable<string>((observer) => {
      let counter = 0;
      const adsTimer = setInterval(() => {
        if (counter === this.adsList.length) {
          clearInterval(adsTimer);
          observer.complete();
        } else if (this.adsList[counter] === "") {
          observer.error("Error: Empty Ads");
        } else {
          observer.next(this.adsList[counter]);
          counter++;
        }
      }, intervalInSeconds * 1000);
      return{
        unsubscribe(){ // will be called 1- error 2- complete 3- unsubscribe()
          clearInterval(adsTimer);
          console.log("in Obs Unsubscribe...");
          
        }
      }
    });
  }

getSerialAds(): Observable<string> 
{
  return from(this.adsList) 
}


}
