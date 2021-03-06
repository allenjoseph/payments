import { UseCase } from '../commons/use-case';
import { Payment } from '@payments/models/commons/payment';
import { PaymentHeader } from '@payments/models/nativescript/payment-header';
import { PaymentGroup } from '@payments/models/nativescript/payment-group';
import { ListOptions } from '@payments/repository/commons/list-options';
import { PaymentRepository } from '@payments/repository/repositories/payment.repository';
import { DataSource } from '@payments/repository/commons/datasource';
import * as moment from 'moment';
import * as R from 'ramda';

export class ListPaymentsUseCase implements UseCase {
    private repository: PaymentRepository;

    constructor(private dataSource: DataSource) {
        this.repository = new PaymentRepository(this.dataSource);
    }

    execute(): Promise<(Payment | PaymentHeader)[]> {
        const options = <ListOptions>{
            orderBy: 'createdAt',
            limitLast: 50,
        };
        return this.repository.getAll(options).then(
            R.compose(
                this.sortPaymentGroups,
                this.groupByCreation
            )
        );
    }

    private sortPaymentGroups(
        groups: PaymentGroup[]
    ): (Payment | PaymentHeader)[] {
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

    private groupByCreation(payments: Payment[]): PaymentGroup[] {
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
