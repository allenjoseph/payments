import { IPayment } from '../entities/payment.interface';
import { IDataSource } from '../datasource/datasource.interface';

export interface IPaymentRepository {
    getAll(): Promise<IPayment[]>;
}

export class PaymentRepository implements IPaymentRepository {
    private dataSource: IDataSource;

    constructor(dataSource: IDataSource) {
        this.dataSource = dataSource;
    }

    getAll(): Promise<IPayment[]> {
        return this.dataSource.list();
    }
}
