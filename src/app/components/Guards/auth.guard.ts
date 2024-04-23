import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouteReuseStrategy, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService:UserAuthService ,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    if(this.authService.isUserLogged)
    {
      return true;
    }
    else
    {
      alert('You Must Login First')
      this.router.navigate(['/UserLogin'])
      return false;
    }
  }
  
}
