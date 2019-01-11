import { ICard } from '../../domain/card.interface';
import { IPayment } from '~/app/domain/payment.interface';

export interface IInputBoundary {
    init(presenter: any): void;

    getCards(): void;

    addCard(card: ICard): void;

    addPayment(card: ICard, payment: IPayment): void;
}
