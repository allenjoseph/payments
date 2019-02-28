import { Injectable, Inject } from '@angular/core';

import { IPayment } from '../entities/payment.interface';
import { IDataSource, IQueryOptions } from '../datasource/datasource.interface';
import { DataSourceProvider } from '../datasource/firebase.datasource';

export interface IPaymentRepository {
    getAll(query?: IQueryOptions): Promise<IPayment[]>;
}

@Injectable({
    providedIn: 'root',
})
export class PaymentRepository implements IPaymentRepository {
    constructor(@Inject(DataSourceProvider) private dataSource: IDataSource) {}

    getAll(query?: IQueryOptions): Promise<IPayment[]> {
        return query ? this.dataSource.query(query) : this.dataSource.list();
    }
}
