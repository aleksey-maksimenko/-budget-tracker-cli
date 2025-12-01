namespace BudgetTracker {
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
}
