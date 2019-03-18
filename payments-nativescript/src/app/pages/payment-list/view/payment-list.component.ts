import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { action } from 'tns-core-modules/ui/dialogs/dialogs';
import { RadListView } from 'nativescript-ui-listview';
import { PaymentHeader } from '@payments/models/nativescript/payment-header';
import { Payment } from '@payments/models/commons/payment';

import { PaymentListPresenter } from '../presenter/payment-list.presenter';

@Component({
    moduleId: module.id,
    selector: 'PaymentList',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
    private cardId: string;

    paymentRadListView: RadListView;
    listViewData: (Payment | PaymentHeader)[];
    isBusy: boolean;

    constructor(
        private route: ActivatedRoute,
        private presenter: PaymentListPresenter,
        private page: Page
    ) {
        this.presenter.setView(this);
    }

    ngOnInit(): void {
        this.isBusy = true;
        this.paymentRadListView = <RadListView>(
            this.page.getViewById('paymentRadListView')
        );
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.cardId = params.get('cardId');
            this.presenter.getPaymentsByCardId(this.cardId);
            this.isBusy = false;
        });
    }

    setPayments(payments: (Payment | PaymentHeader)[]): void {
        this.listViewData = payments;
    }

    tapFilterPayments(): void {
        this.showFilterActionBox();
    }

    private showFilterActionBox(): void {
        const options = {
            title: 'Selecciona el mes',
            cancelButtonText: 'Cancelar',
            actions: this.presenter.getFilters(),
        };

        action(options).then(result => {
            if (result === 'Cancelar') {
                return;
            }
            this.presenter.getPaymentsByCardIdAndFilter(this.cardId, result);
            this.paymentRadListView.refresh();
        });
    }
}
