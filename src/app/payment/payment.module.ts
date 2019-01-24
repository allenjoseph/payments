import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { PaymentRoutingModule } from './payment-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { PaymentListComponent } from './view/payment-list.component';

@NgModule({
    imports: [NativeScriptCommonModule, PaymentRoutingModule],
    declarations: [PaymentListComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class PaymentModule {}
