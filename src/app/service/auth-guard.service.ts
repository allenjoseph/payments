import {
    CanActivate,
    CanLoad,
    ActivatedRouteSnapshot,
    Route,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService) {}

    // For Login
    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (!!this.authService.userSnapshot) {
            return false;
        }
        return true;
    }

    canLoad(route: Route): boolean {
        if (!!this.authService.userSnapshot) {
            return true;
        }
        return false;
    }
}
