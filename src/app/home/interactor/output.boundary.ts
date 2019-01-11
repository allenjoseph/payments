import { ICard } from '../../domain/card.interface';

export interface IOutputBoundary {
    onGetCards(cards: ICard[]): void;
}
