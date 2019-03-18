import { Injectable } from '@angular/core';
import { setString } from 'tns-core-modules/application-settings';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Payment } from '@payments/models/commons/payment';
import { Card } from '@payments/models/commons/card';

import { CardService } from '~/app/core/services/card.service';
import { PaymentService } from '~/app/core/services/payment.service';

@Injectable()
export class HomeInteractor {
    constructor(
        private cardService: CardService,
        private paymentService: PaymentService
    ) {}

    getCards(): Observable<Card[]> {
        return this.cardService.getAll();
    }

    addCard(card: Card): Observable<Card[]> {
        return this.cardService
            .add(card)
            .pipe(flatMap(this.getCards.bind(this)));
    }

    addPayment(card: Card, payment: Payment): Observable<Card[]> {
        setString('cardId', card.cardId);
        return this.paymentService
            .add(payment)
            .pipe(flatMap(this.getCards.bind(this)));
    }
}
