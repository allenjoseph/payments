import { Injectable } from '@angular/core';

import { CardService } from '../../_service/card.service';
import { IOutputBoundary } from './output.boundary';
import { IInputBoundary } from './input.boundary';
import { ICard } from '../../_domain/card.interface';

@Injectable()
export class HomeInteractor implements IInputBoundary {
    outputBoundary: IOutputBoundary;

    constructor(private cardService: CardService) {}

    init(presenter: IOutputBoundary) {
        this.outputBoundary = presenter;
    }

    getCards(): void {
        this.cardService.getAll().subscribe(result => {
            this.outputBoundary.onGetCards(result);
        });
    }

    addCard(card: ICard): void {
        card.amount = 0;
        this.cardService.add(card).subscribe(() => this.getCards());
    }
}
