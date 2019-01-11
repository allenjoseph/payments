import { ICard } from '../../domain/card.interface';

export interface IHomePresenterOutput {
    setCards(cards: ICard[]): void;
}
