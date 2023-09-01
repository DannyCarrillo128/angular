import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  
  return userService.validateToken().pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
      }
    })
  );
};
