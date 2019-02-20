import { NgModule, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';

import { PaymentListRoutingModule } from './payment-list-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { PaymentListComponent } from './view/payment-list.component';
import { PaymentListPresenter } from './presenter/payment-list.presenter';
import { PaymentRepository } from '../data/repositories/payment.repository';
import { FirebaseDataSource } from '../data/datasource/firebase.datasource';
import { ListPaymentsUseCase } from '../domain/use-cases/list-payments.usecase';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        PaymentListRoutingModule,
    ],
    declarations: [PaymentListComponent],
    providers: [
        PaymentListPresenter,
        {
            provide: FirebaseDataSource,
            useFactory: () => new FirebaseDataSource('payments'),
        },
        {
            provide: PaymentRepository,
            useFactory: () => new PaymentRepository(null),
        },
        ListPaymentsUseCase,
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class PaymentListModule {}
