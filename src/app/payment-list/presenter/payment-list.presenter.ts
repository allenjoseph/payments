import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
import { setString } from 'tns-core-modules/application-settings/application-settings';

import { ListPaymentsUseCase } from '~/app/domain/use-cases/list-payments.usecase';

moment.locale('es');

@Injectable()
export class PaymentListPresenter {
    private view: any;

    constructor(private listPayments: ListPaymentsUseCase) {}

    setView(view: any) {
        this.view = view;
    }

    getPaymentsByCardId(cardId: string): void {
        setString('firebase.db.ref', `payments/${cardId}`);
        this.listPayments.execute().then(this.view.setPayments.bind(this.view));
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
}
