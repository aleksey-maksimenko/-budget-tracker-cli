import { IAccount } from '../interfaces/IAccount.js';
import { Transaction } from './Transaction.js';
import { ITransaction } from '../interfaces/ITransaction.js';
import { ISummary } from '../interfaces/ISummary.js';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from 'formatCurrency';
import { AccountUpdate } from '../interfaces/utility-types.js';

export class Account implements IAccount {
  private transactions: Transaction[] = [];
  public id: string; // убираем readonly
  public name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }

  update(update: AccountUpdate): void {
    if (update.id !== undefined) {
      throw new Error('Cannot change account ID');
    }
    
    if (update.name !== undefined) this.name = update.name;
  }

  get income(): number {
    return this.transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get expenses(): number {
    return this.transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get balance(): number {
    return this.income - this.expenses;
  }

  addTransaction(transaction: ITransaction): void {
    this.transactions.push(
      new Transaction(
        transaction.amount,
        transaction.type,
        transaction.date,
        transaction.description
      )
    );
  }

  removeTransactionById(transactionId: string): boolean {
    const index = this.transactions.findIndex((t) => t.id === transactionId);
    if (index !== -1) {
      this.transactions.splice(index, 1);
      return true;
    }
    return false;
  }

  getTransactions(): ITransaction[] {
    return this.transactions;
  }

  getSummary(): ISummary {
    return {
      income: this.income,
      expenses: this.expenses,
      balance: this.balance,
    };
  }

  getSummaryString(): string {
    const formattedBalance = formatCurrency(this.balance);
    const formattedIncome = formatCurrency(this.income);
    const formattedExpenses = formatCurrency(this.expenses);
    
    return `${this.name}: баланс ${formattedBalance} (доходы: ${formattedIncome}, расходы: ${formattedExpenses}, транзакций: ${this.transactions.length})`;
  }

  toString(): string {
    const formattedBalance = formatCurrency(this.balance);
    const formattedIncome = formatCurrency(this.income);
    const formattedExpenses = formatCurrency(this.expenses);
    
    let output = `\n    ${this.name} (ID: ${this.id.slice(0, 8)})\n`;
    output += `Баланс: ${formattedBalance}\n`;
    output += `Доходы: ${formattedIncome} | Расходы: ${formattedExpenses}\n\n`;
    
    if (this.transactions.length === 0) {
      return output + 'Транзакций нет!';
    }
    
    output += 'Транзакции:\n';
    output += this.transactions.map((t) => ' - ' + t.toString()).join('\n');
    return output;
  }
}