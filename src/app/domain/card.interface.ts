export interface ICard {
    brand: string;
    type: string;
    bank: string;
    description: string;
    userId?: string;
    createdAt?: any;

    /* view model */
    cardId?: string;
    payments?: any[];
    totalAmount?: number;
}
