import { NgModule } from '@angular/core';
import { DataSource } from '@payments/repository/commons/datasource';
import { ListPaymentsUseCase } from '@payments/domain/use-cases/list-payments.usecase';

import { FirebaseDataSource } from '../data/datasource/firebase.datasource';

const ListPaymentsUseCaseFactory = (dataSource: DataSource) =>
    new ListPaymentsUseCase(dataSource);

@NgModule({
    providers: [
        { provide: DataSource, useClass: FirebaseDataSource },
        {
            provide: ListPaymentsUseCase,
            useFactory: ListPaymentsUseCaseFactory,
            deps: [DataSource],
        },
    ],
})
export class CoreModule {}
