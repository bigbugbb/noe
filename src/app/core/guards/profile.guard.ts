import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '@app/core/storage/storage.service';
import { Student, School, Company, BasicInfoChecker } from '@app/models';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.storageService.getUser();
    const RoleClass = { Student, School, Company };
    const profile = new RoleClass[user.role](this.storageService.getProfile());

    if (profile.hasValidBasicInfo()) {
      return true;
    }

    // no profile yet, create one by going through the journey
    this.router.navigate([`/profile-guideline/${user.role.toLowerCase()}`]);
    return false;
  }
}