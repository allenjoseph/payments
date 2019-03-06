import { Component } from '@angular/core';

import { AuthService } from '~/app/service/auth.service';

@Component({
    moduleId: module.id,
    selector: 'Login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    isBusy: boolean;
    isLabelErrorVisible: boolean = false;

    constructor(private authService: AuthService) {}

    onTapLogin(email: string, password: string) {
        this.isBusy = true;
        this.isLabelErrorVisible = false;
        this.login({ email, password });
    }

    private login(user: any) {
        this.authService
            .login(user)
            .then(() => (this.isBusy = false))
            .catch(() => {
                this.isBusy = false;
                this.isLabelErrorVisible = true;
            });
    }
}
