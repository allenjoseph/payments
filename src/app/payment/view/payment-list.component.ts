import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { PaymentService } from '~/app/service/payment.service';
import { PaymentListPresenter } from '../presenter/payment-list.presenter';

@Component({
    moduleId: module.id,
    selector: 'PaymentList',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
    listViewData: any[];
    isBusy: boolean;

    constructor(
        private route: ActivatedRoute,
        private presenter: PaymentListPresenter,
        private paymentService: PaymentService
    ) {}

    ngOnInit(): void {
        this.isBusy = true;
        this.route.paramMap
            .pipe(
                flatMap((params: ParamMap) =>
                    this.paymentService.getByCard(params.get('cardId'))
                )
            )
            .subscribe(payments => {
                this.listViewData = this.presenter.formatToListView(payments);
                this.isBusy = false;
            });
    }

    private getCardIdParam(params: ParamMap) {
        return params.get('cardId');
    }
}
