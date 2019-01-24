import { Observable, of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { getValue, push, ServerValue } from 'nativescript-plugin-firebase';
import { getString } from 'tns-core-modules/application-settings';
import { map, flatMap, mergeMap, toArray } from 'rxjs/operators';
import * as R from 'ramda';

import { ICard } from '../domain/card.interface';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    private name: string = '/cards/';

    getAll(): Observable<any> {
        return from(getValue(this.path)).pipe(
            map(this.formatGetAllResponse),
            flatMap(cards =>
                Observable.create(observer => {
                    cards.forEach(card => observer.next(card));
                    observer.complete();
                })
            ),
            mergeMap(({ id, value }) =>
                from(this.getPayments(id)).pipe(
                    map(data => ({
                        ...value,
                        cardId: id,
                        payments: R.values(data.value),
                    }))
                )
            ),
            toArray()
        );
    }

    add(card: ICard): Observable<any> {
        card.userId = this.userId;
        card.createdAt = ServerValue.TIMESTAMP;

        return from(push(this.path, card));
    }

    remove(card: ICard): Observable<any> {
        return of(card);
    }

    getPayments(cardId: string) {
        return getValue(`/payments/${cardId}`);
    }

    get path(): string {
        return this.name + this.userId;
    }

    get userId(): string {
        return getString('userId');
    }

    private formatGetAllResponse(result: any) {
        return R.keys(result.value).map(id => ({
            id,
            value: result.value[id],
        }));
    }
}
