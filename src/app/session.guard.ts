import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from './session.service';

export const sessionGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let session = inject(SessionService);

  if (!session.isSession())
    router.navigate(["login"]);

  return session.isSession();
};
