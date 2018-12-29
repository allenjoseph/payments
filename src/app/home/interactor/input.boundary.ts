import { ICard } from '../../_domain/card.interface';

export interface IInputBoundary {
    init(presenter: any): void;

    getCards(): void;

    addCard(card: ICard): void;
}
