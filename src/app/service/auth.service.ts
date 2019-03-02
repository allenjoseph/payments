import { Injectable } from '@angular/core';
import * as firebase from 'nativescript-plugin-firebase';
import { User } from 'nativescript-plugin-firebase';
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

    constructor(private router: RouterExtensions) {
        this.userSnapshot = null;
        this.initAuth();
    }

    login(user: IUserLogin): Promise<any> {
        return firebase
            .login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: user,
            })
            .then(() =>
                this.router.navigate(['/home'], { clearHistory: true })
            );
    }

    private initAuth() {
        firebase
            .init({
                onAuthStateChanged: data => {
                    if (data.loggedIn) {
                        setString('userId', data.user.uid);
                    }
                    this.userSnapshot = data.user;
                    this.userSubject.next(data.user);
                },
            })
            .catch(console.log);
    }
}
