import { IAccount } from '../interfaces/IAccount.js';
import { Transaction } from './Transaction.js';
import { ITransaction } from '../interfaces/ITransaction.js';
import { ISummary } from '../interfaces/ISummary.js';
import { v4 as uuidv4 } from 'uuid';
import { formatCurrency } from 'formatCurrency';
import { AccountUpdate } from '../interfaces/utility-types.js';
import { writeFile } from "fs/promises";
import { escapeCsvValue } from "../utils/escapeCsvValue.js";
import { LogClass } from '../decorators/LogClass.js';
import { LogMethod } from '../decorators/LogMethod.js';
import { ReadOnly } from '../decorators/ReadOnly.js';
import { Metadata } from '../decorators/Metadata.js';


@LogClass
export class Account implements IAccount {
  @Metadata('description', 'Массив транзакций счета')
  private transactions: Transaction[] = [];
  @ReadOnly
  public id: string; // убираем readonly
  @ReadOnly
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

  @LogMethod
  addTransaction(transaction: ITransaction) {
    this.transactions.push(new Transaction(
      transaction.amount,
      transaction.type,
      transaction.date,
      transaction.description
    ));
  }

  @LogMethod
  removeTransactionById(transactionId: string): boolean {
    const index = this.transactions.findIndex((t) => t.id === transactionId);
    if (index !== -1) {
      this.transactions.splice(index, 1);
      return true;
    }
    return false;
  }
  @LogMethod
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

async exportTransactionsToCSV(filename: string): Promise<void> {
  try {
    const headers = ["id", "amount", "type", "date", "description"];

    const rows = this.transactions.map(tx => [
      escapeCsvValue(tx.id),
      escapeCsvValue(tx.amount),
      escapeCsvValue(tx.type),
      escapeCsvValue(tx.date),
      escapeCsvValue(tx.description ?? "")
    ].join(","));
    const csvContent = [
      headers.join(","),
      ...rows
    ].join("\n");
    await writeFile(filename, csvContent, { encoding: "utf-8" });
  } catch (error) {
    throw new Error("Не удалось выполнить экспорт транзакций в " + filename);
  }
}
}