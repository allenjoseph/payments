import {
    Component,
    OnInit,
    ViewContainerRef,
    ViewChild,
    ElementRef,
} from '@angular/core';
import {
    ModalDialogOptions,
    ModalDialogService,
} from 'nativescript-angular/modal-dialog';
import { RadListView, ListViewEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

import { ModalAddPaymentComponent } from '../../modals/add-payment/modal-add-payment.component';
import { ModalAddCardComponent } from '../../modals/add-card/modal-add-card.component';
import { HomePresenter } from '../presenter/home.presenter';
import { ICard } from '../../domain/card.interface';
import { IPayment } from '../../domain/payment.interface';

@Component({
    moduleId: module.id,
    selector: 'Home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    cards: ICard[];
    isBusy: boolean;
    totalAmount: number;

    @ViewChild('cardsRadListView') cardsRadListViewRef: ElementRef;
    cardsRadListView: RadListView;

    constructor(
        private modalService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
        private presenter: HomePresenter,
        private router: RouterExtensions
    ) {}

    ngOnInit(): void {
        this.cardsRadListView = this.cardsRadListViewRef.nativeElement;

        this.isBusy = true;
        this.presenter.getCards().subscribe((cards: ICard[]) => {
            this.isBusy = false;
            this.onGetCards(cards);
        });
    }

    onTapCard(card: ICard) {
        this.cardsRadListView.notifySwipeToExecuteFinished();
        this.showAddPaymentModal(card, this.onCloseAddPayment.bind(this, card));
    }

    onTapAddCard() {
        this.showAddCardModal({}, this.onCloseAddCard.bind(this));
    }

    onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args.object;
        const rightItem = swipeView.getViewById<View>('left-actions');
        swipeLimits.left = 0;
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    onTapListPayments(args: ListViewEventData) {
        this.isBusy = true;
        this.cardsRadListView.notifySwipeToExecuteFinished();
        const card = args.object.bindingContext;
        this.router
            .navigate(['/payments', { cardId: card.cardId }])
            .then(() => (this.isBusy = false));
    }

    private onGetCards(cards: ICard[]): void {
        this.cards = cards;
        this.totalAmount = this.presenter.getTotalAmount(cards);
    }

    private onCloseAddPayment(card: ICard, payment: IPayment | false): void {
        if (payment) {
            this.isBusy = true;
            this.presenter.addPayment(card, payment);
        }
    }

    private onCloseAddCard(card: ICard) {
        if (card) {
            this.isBusy = true;
            this.presenter.addCard(card);
        }
    }

    private showAddPaymentModal(context: any, onClose: any): void {
        const options: ModalDialogOptions = {
            context,
            fullscreen: true,
            viewContainerRef: this.viewContainerRef,
        };
        this.modalService
            .showModal(ModalAddPaymentComponent, options)
            .then(onClose);
    }

    private showAddCardModal(context: any, onClose: any): void {
        const options: ModalDialogOptions = {
            context,
            fullscreen: true,
            viewContainerRef: this.viewContainerRef,
        };
        this.modalService
            .showModal(ModalAddCardComponent, options)
            .then(onClose);
    }
}
