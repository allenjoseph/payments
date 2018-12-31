import { Observable, of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { ICard } from '../_domain/card.interface';
import { getValue, push } from 'nativescript-plugin-firebase';
import { getString } from 'tns-core-modules/application-settings';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    private name: string = '/cards/';

    getAll(): Observable<any> {
        return from(getValue(this.path)).pipe(
            map(result =>
                R.map(key => {
                    result.value[key].uid = key;
                    return result.value[key];
                }, R.keys(result.value))
            )
        );
    }

    add(card: ICard): Observable<any> {
        return from(push(this.path, card));
    }

    remove(card: ICard): Observable<any> {
        return of(card);
    }

    get path(): string {
        return this.name + getString('userId');
    }
}
