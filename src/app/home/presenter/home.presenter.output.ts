import { ICard } from '../../_domain/card.interface';

export interface IHomePresenterOutput {
    setCards(cards: ICard[]): void;
}
