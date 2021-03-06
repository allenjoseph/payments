import { Injectable } from '@angular/core';
import { getString } from 'tns-core-modules/application-settings';
import { from, Observable, of } from 'rxjs';
import { getValue, push, ServerValue } from 'nativescript-plugin-firebase';
import { map } from 'rxjs/operators';
import * as R from 'ramda';
import { Payment } from '@payments/models/commons/payment';

@Injectable()
export class PaymentService {
    private name: string = '/payments/';

    getAll(): Observable<any> {
        return from(getValue(this.path)).pipe(
            map(result => R.values(result.values))
        );
    }

    getByCard(cardId: string): Observable<any> {
        return from(getValue(`/payments/${cardId}`)).pipe(
            map(response => R.values(response.value))
        );
    }

    add(payment: Payment): Observable<any> {
        payment.createdAt = ServerValue.TIMESTAMP;
        return of(push(this.path, payment));
    }

    get path(): string {
        return this.name + getString('cardId');
    }
}
