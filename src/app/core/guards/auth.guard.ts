import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '@app/core/storage/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storageService.getUser()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
