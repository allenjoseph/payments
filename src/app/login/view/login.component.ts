import { Component } from '@angular/core';
import { AuthService } from '~/app/service/auth.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    moduleId: module.id,
    selector: 'Login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    isBusy = true;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService
    ) {
        authService.user$.subscribe(user => {
            this.isBusy = false;
            if (user) {
                this.router.navigate(['/home'], { clearHistory: true });
            }
        });
    }

    onTapLogin(email: string, password: string) {
        this.isBusy = true;
        this.authService.login({ email, password });
    }
}
