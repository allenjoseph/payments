import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as R from 'ramda';

import { IPayment } from '~/app/domain/payment.interface';

interface IPaymentGroup {
    header: string;
    payments: IPayment[];
}

@Injectable()
export class PaymentListPresenter {
    formatToListView(payments: IPayment[]): any[] {
        return R.compose(
            this.sortPaymentGroups,
            this.groupByCreation
        )(payments);
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
                ...R.reverse(<any[]>R.sort(R.prop('createdAt'), group.payments))
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
            (date.isAfter(firstDayWeek)
                ? groups[0]
                : date.isAfter(oneWeekAgo)
                ? groups[1]
                : date.isAfter(twoWeeksAgo)
                ? groups[2]
                : date.isAfter(threeWeeksAgo)
                ? groups[3]
                : groups[4]
            ).payments.push(payment);
        }, payments);

        return groups;
    }
}
