import { ITransaction } from '../interfaces/ITransaction.js';
import { TransactionType } from '../interfaces/TransactionType.js';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from 'formatCurrency';
import { TransactionUpdate } from '../interfaces/utility-types.js';

export class Transaction implements ITransaction {
  public id: string; // убираем readonly
  public amount: number;
  public type: TransactionType;
  public date: string;
  public description: string;

  constructor(
    amount: number,
    type: TransactionType,
    date: string,
    description: string
  ) {
    this.id = uuidv4();
    this.amount = amount;
    this.type = type;
    this.date = date;
    this.description = description;
  }

  update(update: TransactionUpdate): void {
    if (update.id !== undefined) {
      throw new Error('Cannot change transaction ID');
    }
    
    if (update.amount !== undefined) this.amount = update.amount;
    if (update.type !== undefined) this.type = update.type;
    if (update.date !== undefined) this.date = update.date;
    if (update.description !== undefined) this.description = update.description;
  }

  private formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  toString(): string {
    const typeLabel = this.type === 'income' ? '[INCOME]' : '[EXPENSE]';
    const formattedDate = this.formatDate(this.date);
    const formattedAmount = formatCurrency(this.amount);
    return `Транзакция #${this.id.slice(0, 8)}: ${typeLabel} ${formattedAmount} | ${formattedDate} | ${this.description}`;
  }
}