import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '@routes/auth/login.service';

export const authGuard: CanActivateFn = () => {
    const login = inject(LoginService);
    const router = inject(Router);

    if(login.isAuthenticated()) {
        return true;
    }

    router.navigateByUrl('/login');
    return false;
};
