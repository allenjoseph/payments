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

    getAll(): Observable<ICard[]> {
        return from(getValue(this.path)).pipe(
            map(this.formatCards),
            flatMap(cardsData => from(cardsData)),
            mergeMap((cardsData: any) => this.getCardPayments(cardsData)),
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

    get path(): string {
        return this.name + this.userId;
    }

    get userId(): string {
        return getString('userId');
    }

    private getCardPayments(cardsData: any): Observable<any> {
        return from(getValue(`/payments/${cardsData.id}`)).pipe(
            map(paymentsResponse =>
                this.formatCardWithPayments(cardsData, paymentsResponse)
            )
        );
    }

    private formatCards(cardsResponse: any) {
        return R.keys(cardsResponse.value).map(id => ({
            id,
            value: cardsResponse.value[id],
        }));
    }

    private formatCardWithPayments(cardData: any, paymentsResponse: any) {
        return {
            ...cardData.value,
            cardId: cardData.id,
            payments: R.values(paymentsResponse.value),
            totalAmount: R.sum(
                R.values(paymentsResponse.value).map(o => o.amount)
            ),
        };
    }
}
