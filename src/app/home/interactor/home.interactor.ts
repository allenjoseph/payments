import { Injectable } from '@angular/core';

import { CardRepository } from '../../_repository/card.repository';
import { IOutputBoundary } from './output.boundary';
import { IInputBoundary } from './input.boundary';
import { ICard } from '../../_domain/card.interface';

@Injectable()
export class HomeInteractor implements IInputBoundary {
    outputBoundary: IOutputBoundary;

    constructor(private cardRepository: CardRepository) {}

    init(presenter: IOutputBoundary) {
        this.outputBoundary = presenter;
    }

    getCards(): void {
        this.cardRepository
            .getAll()
            .subscribe(data => this.outputBoundary.onGetCards(data));
    }

    addCard(card: ICard): void {
        card.amount = 0;
        this.cardRepository
            .add(card)
            .subscribe(card => this.outputBoundary.onAddCard(card));
    }
}
