import { NgModule } from '@angular/core';
import { DataSource } from '@payments/repository/commons/datasource';
import { ListPaymentsUseCase } from '@payments/domain/use-cases/list-payments.usecase';

import { FirebaseService } from './services/firebase.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CardService } from './services/card.service';
import { ModalService } from './services/modal.service';
import { PaymentService } from './services/payment.service';

const ListPaymentsUseCaseFactory = (dataSource: DataSource) =>
    new ListPaymentsUseCase(dataSource);

@NgModule({
    providers: [
        AuthGuard,
        AuthService,
        CardService,
        ModalService,
        PaymentService,
        { provide: DataSource, useClass: FirebaseService },
        {
            provide: ListPaymentsUseCase,
            useFactory: ListPaymentsUseCaseFactory,
            deps: [DataSource],
        },
    ],
})
export class CoreModule {}
