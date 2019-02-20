import { Injectable } from '@angular/core';

import { IUseCase } from './usecase.interface';
import { PaymentRepository } from '~/app/data/repositories/payment.repository';

@Injectable()
export class ListPaymentsUseCase implements IUseCase {
    constructor(private repository: PaymentRepository) {}

    execute(): void {
        this.repository.getAll();
    }
}
