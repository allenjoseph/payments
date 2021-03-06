import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '~/app/core/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(): Promise<boolean> {
        return this.authService
            .getCurrentUser()
            .then(user => {
                if (user) {
                    return false;
                }
                return true;
            })
            .catch(() => true);
    }
}
