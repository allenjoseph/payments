import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sum, map } from 'ramda';

import { HomeInteractor } from '../interactor/home.interactor';
import { ICard } from '../../data/entities/card.interface';
import { IPayment } from '../../data/entities/payment.interface';
import { AuthService } from '~/app/service/auth.service';

@Injectable()
export class HomePresenter {
    constructor(
        private interactor: HomeInteractor,
        private authService: AuthService
    ) {}

    getCards(): Observable<ICard[]> {
        return this.interactor.getCards();
    }

    addCard(card: ICard): Observable<ICard[]> {
        return this.interactor.addCard(card);
    }

    addPayment(card: ICard, payment: IPayment): Observable<ICard[]> {
        return this.interactor.addPayment(card, payment);
    }

    getTotalAmount(cards: ICard[]): number {
        return sum(map(card => card.totalAmount, cards));
    }

    logout(): void {
        this.authService.logout();
    }
}
