import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take, tap } from 'rxjs';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userState$().pipe(
    take(1),
    tap((isLoggedIn) => {
      if(isLoggedIn) {
        router.navigate(['']);
      }
    }
    )
  );
}
