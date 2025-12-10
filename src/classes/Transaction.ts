import { ITransaction } from '../interfaces/ITransaction.js';
import { TransactionType } from '../interfaces/TransactionType.js';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from 'formatCurrency'; // Импортируем

export class Transaction implements ITransaction {
  public readonly id: string;

  constructor(
    public amount: number,
    public type: TransactionType,
    public date: string,
    public description: string
  ) {
    this.id = uuidv4();
  }

  private formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  toString(): string {
    const typeLabel = this.type === "income" ? "[INCOME]" : "[EXPENSE]";
    const formattedDate = this.formatDate(this.date);
    const formattedAmount = formatCurrency(this.amount); // используем библиотеку
    return `Транзакция #${this.id}: ${typeLabel} ${formattedAmount} | ${formattedDate} | ${this.description}`;
  }
}