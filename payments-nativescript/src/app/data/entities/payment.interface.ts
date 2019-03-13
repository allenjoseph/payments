import { Payment } from "@payments/models";

export interface IPaymentGroup {
  header: string;
  payments: Payment[];
}

export interface IPaymentHeader {
  isHeader: boolean;
  title: string;
  total: number;
}
