import { Injectable } from '@angular/core';
import { setString } from 'tns-core-modules/application-settings';
import { Observable } from 'rxjs';

import { CardService } from '../../service/card.service';
import { ICard } from '../../data/entities/card.interface';
import { IPayment } from '../../data/entities/payment.interface';
import { PaymentService } from '../../service/payment.service';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class HomeInteractor {
    constructor(
        private cardService: CardService,
        private paymentService: PaymentService
    ) {}

    getCards(): Observable<ICard[]> {
        return this.cardService.getAll();
    }

    addCard(card: ICard): Observable<ICard[]> {
        return this.cardService
            .add(card)
            .pipe(flatMap(this.getCards.bind(this)));
    }

    addPayment(card: ICard, payment: IPayment): Observable<ICard[]> {
        setString('cardId', card.cardId);
        return this.paymentService
            .add(payment)
            .pipe(flatMap(this.getCards.bind(this)));
    }
}
