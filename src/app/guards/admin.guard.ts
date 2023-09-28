import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.role === 'ADMIN') {
    return true;
  }
  
  router.navigateByUrl('/dashboard');
  return false;
};
