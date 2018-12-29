import { ICard } from '../../_domain/card.interface';

export interface IOutputBoundary {
    onGetCards(cards: ICard[]): void;
}
