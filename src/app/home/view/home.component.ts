import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {
    ModalDialogOptions,
    ModalDialogService,
} from 'nativescript-angular/modal-dialog';

import { ModalAddPaymentComponent } from '../../modals/add-payment/modal-add-payment.component';
import { ModalAddCardComponent } from '../../modals/add-card/modal-add-card.component';
import { IHomePresenterOutput } from '../presenter/home.presenter.output';
import { HomePresenter } from '../presenter/home.presenter';
import { ICard } from '../../domain/card.interface';
import { IPayment } from '../../domain/payment.interface';
import { map, sum } from 'ramda';

@Component({
    moduleId: module.id,
    selector: 'Home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, IHomePresenterOutput {
    cards: ICard[];
    isBusy = true;
    totalAmount = 0;

    constructor(
        private _modalService: ModalDialogService,
        private _vcRef: ViewContainerRef,
        private presenter: HomePresenter
    ) {}

    ngOnInit(): void {
        this.presenter.init(this);
        this.presenter.getCards();
    }

    onCardTap(card: ICard) {
        this.showAddPaymentModal(card, this.onAddPaymentClose.bind(this, card));
    }

    setCards(cards: ICard[]): void {
        this.cards = cards;
        this.totalAmount = sum(map(card => card.totalAmount, cards));
        this.isBusy = false;
    }

    onAddCardTap() {
        this.showAddCardModal({}, this.onAddCardClose.bind(this));
    }

    private onAddPaymentClose(card: ICard, payment: IPayment): void {
        this.presenter.addPayment(card, payment);
    }

    private onAddCardClose(card: ICard) {
        this.presenter.addCard(card);
    }

    private showAddPaymentModal(context: any, onClose: any): void {
        const options: ModalDialogOptions = {
            context,
            fullscreen: true,
            viewContainerRef: this._vcRef,
        };
        this._modalService
            .showModal(ModalAddPaymentComponent, options)
            .then(onClose);
    }

    private showAddCardModal(context: any, onClose: any): void {
        const options: ModalDialogOptions = {
            context,
            fullscreen: true,
            viewContainerRef: this._vcRef,
        };
        this._modalService
            .showModal(ModalAddCardComponent, options)
            .then(onClose);
    }
}
