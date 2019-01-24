import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';
import { CardService } from '~/app/service/card.service';
import * as R from 'ramda';
import { IPayment } from '~/app/domain/payment.interface';
import { Observable } from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'PaymentList',
    templateUrl: './payment-list.component.html',
})
export class PaymentListComponent implements OnInit {
    payments: Observable<IPayment[]>;

    constructor(
        private route: ActivatedRoute,
        private cardService: CardService
    ) {}

    ngOnInit(): void {
        this.payments = this.route.paramMap.pipe(
            flatMap((params: ParamMap) =>
                this.cardService.getPayments(params.get('cardId'))
            ),
            map(data => R.values(data.value))
        );
    }
}
