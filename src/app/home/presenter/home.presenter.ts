import { Injectable } from '@angular/core';
import * as R from 'ramda';

import { IHomePresenterInput } from './home.presenter.input';
import { IHomePresenterOutput } from './home.presenter.output';
import { HomeInteractor } from '../interactor/home.interactor';
import { IOutputBoundary } from '../interactor/output.boundary';
import { ICard } from '../../_domain/card.interface';
import { IPayment } from '../../_domain/payment.interface';

@Injectable()
export class HomePresenter implements IHomePresenterInput, IOutputBoundary {
    private view: IHomePresenterOutput;

    constructor(private interactor: HomeInteractor) {}

    init(component: any): void {
        this.view = component;
        this.interactor.init(this);
    }

    getCards(): void {
        this.interactor.getCards();
    }

    onGetCards(cards: ICard[]): void {
        cards.forEach(card => {
            card.totalAmount = R.sum(card.payments.map(o => o.amount));
        });
        this.view.setCards(cards);
    }

    addCard(card: ICard): void {
        this.interactor.addCard(card);
    }

    addPayment(card: ICard, payment: IPayment): void {
        this.interactor.addPayment(card, payment);
    }
}
