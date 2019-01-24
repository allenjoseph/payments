import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Subscription } from 'rxjs';
import { User } from 'nativescript-plugin-firebase';

import { AuthService } from '~/app/service/auth.service';

@Component({
    moduleId: module.id,
    selector: 'Login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
    isBusy = true;
    authSuscription: Subscription;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authSuscription = this.authService.user$.subscribe(
            this.onChangeUser.bind(this)
        );
    }
    ngOnDestroy(): void {
        this.authSuscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        // hack to update ActivityIndicator
        setTimeout(() => (this.isBusy = this.isBusy));
    }

    onTapLogin(email: string, password: string) {
        this.isBusy = true;
        this.authService.login({ email, password });
    }

    private onChangeUser(user: User): void {
        this.isBusy = false;
        if (user) {
            this.router.navigate(['/home'], { clearHistory: true });
        }
    }
}
