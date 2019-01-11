import { Component } from '@angular/core';
import { AuthService } from '~/app/service/auth.service';

@Component({
    moduleId: module.id,
    selector: 'Login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    constructor(private authService: AuthService) {}

    onTapLogin(email: string, password: string) {
        this.authService.login({ email, password });
    }
}
