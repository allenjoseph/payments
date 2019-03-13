import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    moduleId: module.id,
    selector: 'modal-add-payment',
    templateUrl: './modal-add-payment.component.html',
    styleUrls: ['./modal-add-payment.component.css'],
})
export class ModalAddPaymentComponent {
    card: any;

    constructor(private _params: ModalDialogParams) {
        this.card = _params.context;
    }

    close(): void {
        this._params.closeCallback(false);
    }

    save(amount: number, description: string): void {
        this._params.closeCallback({ amount, description });
    }
}
