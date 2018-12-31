import { Injectable } from '@angular/core';

import { CardService } from '../../_service/card.service';
import { IOutputBoundary } from './output.boundary';
import { IInputBoundary } from './input.boundary';
import { ICard } from '../../_domain/card.interface';
import { IPayment } from '../../_domain/payment.interface';
import { PaymentService } from '../../_service/payment.service';
import { setString } from 'tns-core-modules/application-settings';

@Injectable()
export class HomeInteractor implements IInputBoundary {
    outputBoundary: IOutputBoundary;

    constructor(
        private cardService: CardService,
        private paymentService: PaymentService
    ) {}

    init(presenter: IOutputBoundary) {
        this.outputBoundary = presenter;
    }

    getCards(): void {
        this.cardService.getAll().subscribe(result => {
            console.log(result);
            this.outputBoundary.onGetCards(result);
        });
    }

    addCard(card: ICard): void {
        card.amount = 0;
        this.cardService.add(card).subscribe(() => this.getCards());
    }

    addPayment(card: ICard, payment: IPayment): void {
        setString('cardId', card.uid);
        this.paymentService.add(payment);
    }
}
