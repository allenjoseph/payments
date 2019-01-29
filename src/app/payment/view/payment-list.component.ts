import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { IPayment } from '~/app/domain/payment.interface';
import { PaymentService } from '~/app/service/payment.service';
import * as R from 'ramda';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'PaymentList',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
    payments: IPayment[];
    isBusy: boolean;

    constructor(
        private route: ActivatedRoute,
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
                this.payments = this.formatPayments(payments);
                this.isBusy = false;
            });
    }

    private formatPayments(payments: IPayment[]) {
        const paymentsWithHeaders = [];
        const paymentsSortedAndGrouped = R.compose(
            this.groupByCreation,
            this.sortByCreation
        )(payments);

        R.forEach(groupKey => {
            paymentsWithHeaders.push({
                isHeader: true,
                title: groupKey,
            });
            paymentsWithHeaders.push(...paymentsSortedAndGrouped[groupKey]);
        }, R.keys(paymentsSortedAndGrouped));

        return paymentsWithHeaders;
    }

    private sortByCreation(payments: IPayment[]) {
        return R.sort(R.prop('createdAt'))(payments);
    }

    private groupByCreation(payments: IPayment[]) {
        const threeWeeksAgo = moment()
            .startOf('isoWeek')
            .subtract(3, 'week');
        const twoWeeksAgo = moment()
            .startOf('isoWeek')
            .subtract(2, 'week');
        const oneWeekAgo = moment()
            .startOf('isoWeek')
            .subtract(1, 'week');
        const firstDayWeek = moment().startOf('isoWeek');

        return R.groupBy(({ createdAt }) => {
            const date = moment(createdAt);
            return date.isBefore(threeWeeksAgo)
                ? 'Anteriores'
                : date.isBefore(twoWeeksAgo)
                ? 'Hace 3 semanas'
                : date.isBefore(oneWeekAgo)
                ? 'Hace 2 semanas'
                : date.isBefore(firstDayWeek)
                ? 'Hace 1 semana'
                : 'En esta semana';
        }, payments);
    }
}
