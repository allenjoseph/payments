import { CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanLoad {
    constructor(
        private router: RouterExtensions,
        private authService: AuthService
    ) {}

    canLoad(route: Route): boolean {
        if (!!this.authService.userSnapshot) {
            return true;
        }
        return false;
    }
}
