import { Injectable } from '@angular/core';
import { Behavior } from 'popper.js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isLoggedSubject:BehaviorSubject<boolean>;

  constructor() {
    
    this.isLoggedSubject=new BehaviorSubject<boolean>(false);
   }

  
  
  login(userName:string, password:string){
    // call login Api, and get access token 
    let usrToken='123465789';
    localStorage.setItem("token",usrToken)
    this.isLoggedSubject.next(true);
  }

  logout(){
localStorage.removeItem("token");
this.isLoggedSubject.next(false);
  }

  get isUserLogged(): Boolean
{
return (localStorage.getItem('token'))? true : false

}
  getloggedStatus() : Observable<boolean>
  {
    return this.isLoggedSubject.asObservable();
  }

}
