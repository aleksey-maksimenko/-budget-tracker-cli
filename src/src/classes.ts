import {
  ITransaction,
  IAccount,
  IAccountManager,
  ISummary,
  TransactionType,
} from "./types";

export class Transaction implements ITransaction {
  constructor(
    public id: number,
    public amount: number,
    public type: TransactionType,
    public date: string,
    public description: string
  ) {}

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
    return `Транзакция #${this.id}: ${typeLabel} ${this.amount} RUB | ${formattedDate} | ${this.description}`;
  }
}

export class Account implements IAccount {
  private transactions: Transaction[] = [];

  constructor(public id: number, public name: string) {}
  get income(): number {
    return this.transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }
  get expenses(): number {
    return this.transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get balance(): number {
    return this.income - this.expenses;
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  removeTransactionById(transactionId: number): boolean {
    const index = this.transactions.findIndex((t) => t.id === transactionId);
    if (index !== -1) {
      this.transactions.splice(index, 1);
      return true;
    }
    return false;
  }

  getTransactions(): Transaction[] {
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
    return `${this.name}: баланс ${this.balance} RUB (доходы: ${this.income}, расходы: ${this.expenses}, транзакций: ${this.transactions.length})`;
  }

  toString(): string {
    let output = `\n    ${this.name} \n`;
    output += `Баланс: ${this.balance} RUB\n`;
    output += `Доходы: ${this.income} RUB | Расходы: ${this.expenses} RUB\n\n`;
    if (this.transactions.length === 0) {
      return output + "Транзакций нет!";
    }
    output += "Транзакции:\n";
    output += this.transactions.map((t) => " - " + t.toString()).join("\n");
    return output;
  }
}

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

  addAccount(account: Account): void {
    this.accounts.push(account);
  }

  removeAccountById(accountId: number): boolean {
    const idx = this.accounts.findIndex((a) => a.id === accountId);
    if (idx !== -1) {
      this.accounts.splice(idx, 1);
      return true;
    }
    return false;
  }

  getAccounts(): Account[] {
    return this.accounts;
  }

  getAccountById(id: number): Account | undefined {
    return this.accounts.find((a) => a.id === id);
  }

  getSummary(): ISummary {
    return {
      income: this.income,
      expenses: this.expenses,
      balance: this.balance,
    };
  }

  getSummaryString(): string {
    return `Всего счетов: ${this.accounts.length}\nОбщий баланс: ${this.balance} RUB`;
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
