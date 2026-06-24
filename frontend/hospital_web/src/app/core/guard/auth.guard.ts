import { Injectable, inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { LocalStorageService } from '@shared/services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private router = inject(Router);
  private store = inject(LocalStorageService);


  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const currentUser = this.store.get('currentUser') as { roles?: { name: string }[] } | null;
    if (currentUser) {
      const userRole = currentUser.roles?.[0]?.name; // Optional chaining to safely access the role
      // If no role exists, you might want to handle it (e.g., redirect or show an error)
      if (!userRole) {
        this.router.navigate(['/authentication/signin']);
        return false;
      }

      // Check if the route requires a specific role and if the user's role matches
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        // If the role does not match, navigate to the signin page
        this.router.navigate(['/authentication/signin']);
        return false;
      }
      return true;
    }

    // If no current user is found, redirect to signin
    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
