import { TransactionType } from './TransactionType.js';
import { TransactionUpdate } from './utility-types.js'; 

export interface ITransaction {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
  toString(): string;
  update(update: TransactionUpdate): void; // Добавляем метод
}