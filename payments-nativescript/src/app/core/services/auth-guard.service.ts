import { CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(private authService: AuthService) {}

    canLoad(): boolean {
        if (!!this.authService.userSnapshot) {
            return true;
        }
        return false;
    }
}
