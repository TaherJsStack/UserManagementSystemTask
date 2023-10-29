import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocalstorageService } from '../app/localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private localstorageService: LocalstorageService,
    private router: Router,

    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles: number[] = next.data['roles']; // Get the required roles from the route data
    
    return forkJoin([
      this.localstorageService.getRole()
    ]).pipe(
      switchMap(([ getRole]: [ string]) => {

        if (requiredRoles.toString() === getRole.toString()) {
          // User is authenticated and has any of the required roles
          // this.router.navigate(['/system'])
          return of(true);
        } else if (requiredRoles.toString() === getRole.toString()) {
          // User is authenticated but does not have any of the required roles
          // You can redirect to a different route or show an unauthorized message
          this.router.navigate(['/'])
          return of(true);
        } else {
          this.router.navigate(['/'])

          // User is not authenticated
          // You can redirect to a login page or another route
          return of(false);
        }
      })
    );
  }
}