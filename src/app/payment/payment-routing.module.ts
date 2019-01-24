import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { PaymentListComponent } from './view/payment-list.component';

const routes: Routes = [
    {
        path: '',
        component: PaymentListComponent,
        children: [
            {
                path: ':cardId',
                component: PaymentListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
})
export class PaymentRoutingModule {}
