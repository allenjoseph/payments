import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ModalAddPaymentComponent } from '../modals/add-payment/modal-add-payment.component';
import { HomeInteractor } from './interactor/home.interactor';
import { HomePresenter } from './presenter/home.presenter';
import { ModalAddCardComponent } from '../modals/add-card/modal-add-card.component';

@NgModule({
    imports: [NativeScriptCommonModule, HomeRoutingModule],
    declarations: [
        ModalAddPaymentComponent,
        ModalAddCardComponent,
        HomeComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [ModalDialogService, HomeInteractor, HomePresenter],
    entryComponents: [ModalAddPaymentComponent, ModalAddCardComponent],
})
export class HomeModule {}
