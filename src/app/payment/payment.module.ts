import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular/listview-directives';

import { PaymentRoutingModule } from './payment-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { PaymentListComponent } from './view/payment-list.component';
import { PaymentListPresenter } from './presenter/payment-list.presenter';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        PaymentRoutingModule,
    ],
    declarations: [PaymentListComponent],
    providers: [PaymentListPresenter],
    schemas: [NO_ERRORS_SCHEMA],
})
export class PaymentModule {}
