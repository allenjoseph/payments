import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sum, map } from 'ramda';
import { Payment } from '@payments/models/commons/payment';
import { Card } from '@payments/models/commons/card';

import { HomeInteractor } from '../interactor/home.interactor';
import { AuthService } from '~/app/core/services/auth.service';

@Injectable()
export class HomePresenter {
    constructor(
        private interactor: HomeInteractor,
        private authService: AuthService
    ) {}

    getCards(): Observable<Card[]> {
        return this.interactor.getCards();
    }

    addCard(card: Card): Observable<Card[]> {
        return this.interactor.addCard(card);
    }

    addPayment(card: Card, payment: Payment): Observable<Card[]> {
        return this.interactor.addPayment(card, payment);
    }

    getTotalAmount(cards: Card[]): number {
        return sum(map(card => card.totalAmount, cards));
    }

    logout(): void {
        this.authService.logout();
    }
}
