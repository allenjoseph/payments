import { Injectable, ViewContainerRef, Type } from '@angular/core';
import {
    ModalDialogService,
    ModalDialogOptions,
} from 'nativescript-angular/modal-dialog';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    constructor(private modalService: ModalDialogService) {}

    open(
        modalComponent: Type<any>,
        context: any,
        viewContainerRef: ViewContainerRef
    ): Promise<any> {
        const options: ModalDialogOptions = {
            context,
            fullscreen: true,
            viewContainerRef,
        };
        return this.modalService.showModal(modalComponent, options);
    }
}
