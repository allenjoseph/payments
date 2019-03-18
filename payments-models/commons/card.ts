export class Card {
    brand: string;
    type: string;
    bank: string;
    description: string;
    dueDate: number;
    userId?: string;
    createdAt?: any;

    /* view model */
    cardId?: string;
    payments?: any[];
    totalAmount?: number;
}
