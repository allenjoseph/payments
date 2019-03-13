import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { PaymentListRoutingModule } from './payment-list-routing.module';
import { PaymentListComponent } from './view/payment-list.component';
import { PaymentListPresenter } from './presenter/payment-list.presenter';
import { ListPaymentsUseCase } from '~/app/domain/use-cases/list-payments.usecase';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        PaymentListRoutingModule,
    ],
    declarations: [PaymentListComponent],
    providers: [ListPaymentsUseCase, PaymentListPresenter],
    schemas: [NO_ERRORS_SCHEMA],
})
export class PaymentListModule {}