import { Injectable } from '@angular/core';
import { setString } from 'tns-core-modules/application-settings';
import { Observable } from 'rxjs';

import { CardService } from '../../service/card.service';
import { ICard } from '../../domain/card.interface';
import { IPayment } from '../../domain/payment.interface';
import { PaymentService } from '../../service/payment.service';

@Injectable()
export class HomeInteractor {
    constructor(
        private cardService: CardService,
        private paymentService: PaymentService
    ) {}

    getCards(): Observable<ICard[]> {
        return this.cardService.getAll();
    }

    addCard(card: ICard): void {
        this.cardService.add(card).subscribe(() => this.getCards());
    }

    addPayment(card: ICard, payment: IPayment): void {
        setString('cardId', card.cardId);
        this.paymentService.add(payment).subscribe(() => this.getCards());
    }
}
