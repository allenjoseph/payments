import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    ViewContainerRef,
} from '@angular/core';
import { RadListView, ListViewEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

import { ModalAddPaymentComponent } from '../../modals/add-payment/modal-add-payment.component';
import { ModalAddCardComponent } from '../../modals/add-card/modal-add-card.component';
import { HomePresenter } from '../presenter/home.presenter';
import { ICard } from '../../data/entities/card.interface';
import { IPayment } from '../../data/entities/payment.interface';
import { ModalService } from '~/app/service/modal.service';

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
        private modalService: ModalService,
        private presenter: HomePresenter,
        private router: RouterExtensions,
        private viewContainerRef: ViewContainerRef
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
        this.modalService
            .open(ModalAddPaymentComponent, card, this.viewContainerRef)
            .then(this.onCloseAddPayment.bind(this, card));
    }

    onTapAddCard() {
        this.modalService
            .open(ModalAddCardComponent, {}, this.viewContainerRef)
            .then(this.onCloseAddCard.bind(this));
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

    onTapLogout() {
        this.presenter.logout();
    }

    private onGetCards(cards: ICard[]): void {
        this.cards = cards;
        this.totalAmount = this.presenter.getTotalAmount(cards);
    }

    private onCloseAddPayment(card: ICard, payment: IPayment): void {
        if (!payment) {
            return;
        }
        this.isBusy = true;
        this.presenter.addPayment(card, payment).subscribe(cards => {
            this.isBusy = false;
            this.onGetCards(cards);
        });
    }

    private onCloseAddCard(card: ICard): void {
        if (!card) {
            return;
        }
        this.isBusy = true;
        this.presenter.addCard(card).subscribe(cards => {
            this.isBusy = false;
            this.onGetCards(cards);
        });
    }
}
