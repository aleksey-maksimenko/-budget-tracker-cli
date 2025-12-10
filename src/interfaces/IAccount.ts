import { ITransaction } from './ITransaction.js';
import { ISummary } from './ISummary.js';
import { AccountUpdate } from './utility-types.js'; 

export interface IAccount {
  id: string;
  name: string;
  addTransaction(transaction: ITransaction): void;
  removeTransactionById(transactionId: string): boolean;
  getTransactions(): ITransaction[];
  getSummary(): ISummary;
  getSummaryString(): string;
  toString(): string;
  update(update: AccountUpdate): void; 
}