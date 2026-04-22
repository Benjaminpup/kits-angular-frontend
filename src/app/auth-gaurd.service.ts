import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  hasIdToken: any;
  hasAccessToken:any;
  // token: string;
  constructor(private router: Router) {


  }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (sessionStorage.getItem('role') != null) {
    return true;
  }
  // else if(this.token != null)/*(this.hasIdToken && this.hasAccessToken)*/
  // {
  //   return true;
  // }
  else {
    this.router.navigateByUrl('/login');
    // alert('auhcalled')
    // sessionStorage.setItem('hideButtons', 'false');
    return false;
  }
}
}