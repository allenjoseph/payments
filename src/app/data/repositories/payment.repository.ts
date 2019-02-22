import { Injectable, Inject } from '@angular/core';

import { IPayment } from '../entities/payment.interface';
import { IDataSource } from '../datasource/datasource.interface';
import { DataSourceProvider } from '../datasource/firebase.datasource';

export interface IPaymentRepository {
    getAll(): Promise<IPayment[]>;
}

@Injectable()
export class PaymentRepository implements IPaymentRepository {
    constructor(@Inject(DataSourceProvider) private dataSource: IDataSource) {}

    getAll(): Promise<IPayment[]> {
        return this.dataSource.list();
    }
}
