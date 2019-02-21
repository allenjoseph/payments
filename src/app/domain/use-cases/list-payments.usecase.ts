import { Injectable } from '@angular/core';

import { IUseCase } from './usecase.interface';
import {
    PaymentRepository,
    IPaymentRepository,
} from '~/app/data/repositories/payment.repository';
import { IPayment } from '~/app/data/entities/payment.interface';
import { FirebaseDataSource } from '~/app/data/datasource/firebase.datasource';
import { getString } from 'tns-core-modules/application-settings/application-settings';

@Injectable()
export class ListPaymentsUseCase implements IUseCase {
    private repository: IPaymentRepository;

    constructor() {
        const ref = `payments/${getString('cardId')}`;
        const dataSource = new FirebaseDataSource(ref);
        this.repository = new PaymentRepository(dataSource);
    }

    execute(): Promise<IPayment[]> {
        return this.repository.getAll();
    }
}
