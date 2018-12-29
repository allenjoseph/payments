import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { action } from 'tns-core-modules/ui/dialogs';
import { ICard } from '../../_domain/card.interface';

@Component({
    moduleId: module.id,
    selector: 'modal-add-card',
    templateUrl: './modal-add-card.component.html',
    styleUrls: ['./modal-add-card.component.css'],
})
export class ModalAddCardComponent {
    constructor(private _params: ModalDialogParams) {}
    brand: string;
    type: string;

    close(): void {
        this._params.closeCallback(false);
    }

    save(bank: string, description: string): void {
        if (!bank || !description || !this.brand || !this.type) {
            return;
        }
        const newCard: ICard = {
            bank,
            description,
            brand: this.brand,
            type: this.type,
        };
        this._params.closeCallback(newCard);
    }

    onBrandTap() {
        const options = {
            title: 'Select a brand',
            actions: ['VISA', 'MASTERCARD'],
        };
        action(options).then(result => (this.brand = result));
    }

    onTypeTap() {
        const options = {
            title: 'Select a type',
            actions: ['CRÉDITO', 'DÉBITO'],
        };
        action(options).then(result => (this.type = result));
    }
}
