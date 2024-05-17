import { CanActivateFn , Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
let router : Router
export const authGuard: CanActivateFn = (route, state) => {
  let  authService = inject(AuthService)
    if (authService.isAuthenticated()) {
      return true;
    } else {
   /*   router.navigate(['/salle']);*/
      return false;
    }
  }

