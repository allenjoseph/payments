import { Payment } from '@payments/models/commons/payment';
import { ListOptions } from '../commons/list-options';
import { DataSource } from '../commons/datasource';

export class PaymentRepository {
    constructor(private dataSource: DataSource) {}

    getAll(query?: ListOptions): Promise<Payment[]> {
        return query ? this.dataSource.query(query) : this.dataSource.list();
    }
}
