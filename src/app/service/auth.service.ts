import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { User, AuthStateData } from 'nativescript-plugin-firebase';
import { setString } from 'tns-core-modules/application-settings';
import { Subject } from 'rxjs';
import { RouterExtensions } from 'nativescript-angular/router';

interface IUserLogin {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userSubject = new Subject<User>();

    user$ = this.userSubject.asObservable();

    userSnapshot: User;

    constructor(private router: RouterExtensions, private ngZone: NgZone) {
        this.userSnapshot = null;
        this.initAuth();
    }

    login(user: IUserLogin): Promise<any> {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: user,
        });
    }

    logout(): void {
        firebase.logout();
    }

    getCurrentUser(): Promise<User> {
        return firebase.getCurrentUser();
    }

    private initAuth() {
        firebase.init({
            onAuthStateChanged: this.onAuthStateChanged.bind(this),
        });
    }

    private onAuthStateChanged(data: AuthStateData) {
        this.userSnapshot = data.user;
        this.userSubject.next(data.user);
        if (data.loggedIn) {
            setString('userId', data.user.uid);
        }
        const urlRedirect = data.loggedIn ? '/home' : '/login';
        this.ngZone.run(() => {
            this.router.navigate([urlRedirect], { clearHistory: true });
        });
    }
}
