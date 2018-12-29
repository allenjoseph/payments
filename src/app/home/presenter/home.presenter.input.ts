import { ICard } from '../../_domain/card.interface';

export interface IHomePresenterInput {
    init(component: any): void;

    getCards(): void;

    addCard(card: ICard): void;

    addPayment(payment: any): void;
}
