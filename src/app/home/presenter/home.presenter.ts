import { Injectable } from '@angular/core';

import { IHomePresenterInput } from './home.presenter.input';
import { HomeInteractor } from '../interactor/home.interactor';
import { ICard } from '../../domain/card.interface';
import { IPayment } from '../../domain/payment.interface';
import { Observable } from 'rxjs';
import { sum, map } from 'ramda';

@Injectable()
export class HomePresenter {
    constructor(private interactor: HomeInteractor) {}

    getCards(): Observable<ICard[]> {
        return this.interactor.getCards();
    }

    addCard(card: ICard): void {
        this.interactor.addCard(card);
    }

    addPayment(card: ICard, payment: IPayment): void {
        this.interactor.addPayment(card, payment);
    }

    getTotalAmount(cards: ICard[]): number {
        return sum(map(card => card.totalAmount, cards));
    }
}
