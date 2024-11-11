import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('securitKey');
  if (token) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
