import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isLogged: Boolean= false;

  constructor(private authService:UserAuthService){

  }
  ngOnInit(): void {
    //this.isLogged=this.authService.isUserLogged;   // isUserLogged de function men tl user-auth.service
    this.authService.getloggedStatus().subscribe(status=>{
      this.isLogged=status;
    })
  }
  login(){
this.authService.login('UserName','Password');
this.isLogged=this.authService.isUserLogged; 
  }
  logout(){
this.authService.logout();
this.isLogged=this.authService.isUserLogged; 
  }
  get isUserLogged():boolean{
    return (localStorage.getItem('token'))? true:false
  }
}
