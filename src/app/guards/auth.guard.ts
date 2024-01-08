import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, filter, take, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.currentUser.pipe(
      filter(value => value !== null),
      take(1),
      map(isAuthenticated => {
        console.log('isAuthenticated : ', isAuthenticated)
        
        if (isAuthenticated) return true
        else return this.router.createUrlTree(['/'])
      })
    );
  }
  
}