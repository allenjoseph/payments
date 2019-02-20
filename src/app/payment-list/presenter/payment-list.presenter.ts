import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as R from 'ramda';
import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

import { IPayment } from '~/app/data/entities/payment.interface';
import { PaymentService } from '~/app/service/payment.service';
import { ListPaymentsUseCase } from '~/app/domain/use-cases/list-payments.usecase';

interface IPaymentGroup {
    header: string;
    payments: IPayment[];
}

@Injectable()
export class PaymentListPresenter {
    private view: any;

    constructor(
        private paymentService: PaymentService,
        private listPayments: ListPaymentsUseCase
    ) {}

    setView(view: any) {
        this.view = view;
    }

    getPaymentsByCardId(cardId: string): void {
        this.paymentService
            .getByCard(cardId)
            .pipe(map(this.formatPaymentList.bind(this)))
            .subscribe(data => this.view.setPayments(data));

        this.listPayments.execute();
    }

    formatPaymentList(payments: IPayment[]): any[] {
        return R.compose(
            this.sortPaymentGroups,
            this.groupByCreation
        )(payments);
    }

    getPaymentsByCardIdAndFilter(cardId: string, filter: string): void {}

    getFilters(): string[] {
        let monthsToFilter = [];
        const lastThreeMonths = 3;
        const currentDate = moment();

        let counter = 0;
        while (counter < lastThreeMonths) {
            const monthName = currentDate.subtract(1, 'month').format('MMMM');
            monthsToFilter.push(monthName);
            counter++;
        }

        return monthsToFilter;
    }

    private sortPaymentGroups(groups: IPaymentGroup[]): any[] {
        const listViewData = [];
        R.forEach(group => {
            listViewData.push({
                isHeader: true,
                title: group.header,
                total: R.sum(<any[]>R.map(R.prop('amount'), group.payments)),
            });

            listViewData.push(
                ...R.reverse(<any[]>(
                    R.sortBy(R.prop('createdAt'), group.payments)
                ))
            );
        }, groups);

        return listViewData;
    }

    private groupByCreation(payments: IPayment[]): IPaymentGroup[] {
        const firstDayWeek = moment().startOf('isoWeek');
        const oneWeekAgo = moment(firstDayWeek).subtract(1, 'week');
        const twoWeeksAgo = moment(firstDayWeek).subtract(2, 'week');
        const threeWeeksAgo = moment(firstDayWeek).subtract(3, 'week');

        const groups = [
            { header: 'En esta semana', payments: [] },
            { header: 'Hace 1 semana', payments: [] },
            { header: 'Hace 2 semanas', payments: [] },
            { header: 'Hace 3 semanas', payments: [] },
            { header: 'Anteriores', payments: [] },
        ];

        R.forEach(payment => {
            const date = moment(payment.createdAt);
            const group = date.isAfter(firstDayWeek)
                ? groups[0]
                : date.isAfter(oneWeekAgo)
                ? groups[1]
                : date.isAfter(twoWeeksAgo)
                ? groups[2]
                : date.isAfter(threeWeeksAgo)
                ? groups[3]
                : groups[4];
            group.payments.push(payment);
        }, payments);

        return groups;
    }
}
