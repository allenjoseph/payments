import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {
    ModalDialogOptions,
    ModalDialogService,
} from 'nativescript-angular/modal-dialog';
import { ListViewEventData } from 'nativescript-ui-listview';
import { map, sum } from 'ramda';

import { ModalAddPaymentComponent } from '../../modals/add-payment/modal-add-payment.component';
import { ModalAddCardComponent } from '../../modals/add-card/modal-add-card.component';
import { IHomePresenterOutput } from '../presenter/home.presenter.output';
import { HomePresenter } from '../presenter/home.presenter';
import { ICard } from '../../domain/card.interface';
import { IPayment } from '../../domain/payment.interface';

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

    onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args['object'];
        const rightItem = swipeView.getViewById<any>('detail-view');
        swipeLimits.left = 0;
        swipeLimits.right = rightItem.getMeasuredWidth();
    }

    onRightSwipeClick(args) {
        console.log('Right swipe click');
    }

    private onAddPaymentClose(card: ICard, payment: IPayment | false): void {
        this.isBusy = true;
        if (payment) {
            this.presenter.addPayment(card, payment);
        } else {
            this.isBusy = false;
        }
    }

    private onAddCardClose(card: ICard) {
        this.isBusy = true;
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
