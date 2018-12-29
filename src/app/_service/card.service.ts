import { Observable, of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { ICard } from '../_domain/card.interface';
import * as firebase from 'nativescript-plugin-firebase';
import { getString } from 'tns-core-modules/application-settings';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    private name: string = '/cards/';

    getAll(): Observable<any> {
        return from(firebase.getValue(this.name + this.userId)).pipe(
            map(result => R.values(result.value))
        );
    }

    add(card: ICard): Observable<any> {
        return from(firebase.push(this.name + this.userId, card));
    }

    remove(card: ICard): Observable<any> {
        return of(card);
    }

    get userId(): string {
        return getString('userId');
    }
}
