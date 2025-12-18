import type { TransactionTypeEnum } from "./transaction.enums.js";

export type TransactionView = {
  invoice_number: string;
  type: TransactionTypeEnum;
  description: string;
  amount: string;
  created_on: Date;
};

export interface TransactionParams {
  accountId: number;
  invoiceNumber: string;
  type: TransactionTypeEnum;
  description: string;
  amount: number;
  serviceId?: number;
}

export interface PaymentTransactionResponse {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: TransactionTypeEnum;
  total_amount: number;
  created_on: Date;
}

export interface HistoryTransactionRecord {
  invoice_number: string;
  transaction_type: TransactionTypeEnum;
  description: string;
  total_amount: number;
  created_on: Date;
}

export interface HistoryTransactionResponse {
  offset: number;
  limit: number;
  records: HistoryTransactionRecord[];
}
