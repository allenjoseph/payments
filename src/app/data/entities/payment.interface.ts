export interface IPayment {
    amount: number;
    description: string;
    createdAt: number;
}

export interface IPaymentGroup {
    header: string;
    payments: IPayment[];
}

export interface IPaymentHeader {
    isHeader: boolean;
    title: string;
    total: number;
}
