import { IAccountManager } from '../interfaces/IAccountManager.js';
import { Account } from './Account.js';
import { IAccount } from '../interfaces/IAccount.js';
import { ISummary } from '../interfaces/ISummary.js';
import { formatCurrency } from 'formatCurrency'

export class AccountManager implements IAccountManager {
  private accounts: Account[] = [];

  get income(): number {
    return this.accounts.reduce((sum, acc) => sum + acc.income, 0);
  }

  get expenses(): number {
    return this.accounts.reduce((sum, acc) => sum + acc.expenses, 0);
  }

  get balance(): number {
    return this.income - this.expenses;
  }

  get balanceValue(): number {
    return this.balance;
  }

  addAccount(account: Account): void {
    this.accounts.push(account);
  }

  removeAccountById(id: string): boolean {
    const idx = this.accounts.findIndex((a) => a.id === id);
    if (idx !== -1) {
      this.accounts.splice(idx, 1);
      return true;
    }
    return false;
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  getAccountById(id: string): IAccount | undefined {
    return this.accounts.find(account => account.id === id);
  }

  getSummary(): ISummary {
    return {
      income: this.income,
      expenses: this.expenses,
      balance: this.balance,
    };
  }

  getSummaryString(): string {
    const summary = this.getSummary();
    const formattedBalance = formatCurrency(summary.balance);
    const formattedIncome = formatCurrency(summary.income);
    const formattedExpenses = formatCurrency(summary.expenses);
    return `Всего счетов: ${this.accounts.length}\nОбщий баланс: ${formattedBalance} (доходы: ${formattedIncome}, расходы: ${formattedExpenses})`;
  }

  toString(): string {
    let output = "   Общий бюджет\n";
    output += `Всего счетов: ${this.accounts.length}\n`;
    output += `Доходы: ${this.income} RUB | Расходы: ${this.expenses} RUB | Баланс: ${this.balance} RUB\n\n`;
    this.accounts.forEach((acc) => {
      output += acc.toString() + "\n\n";
    });
    return output;
  }
}
