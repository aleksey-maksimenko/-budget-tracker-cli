namespace BudgetTracker {
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

    addTransaction(transaction: ITransaction): void {
      this.transactions.push(
        new Transaction(
          transaction.id,
          transaction.amount,
          transaction.type,
          transaction.date,
          transaction.description
        )
      );
    }

    removeTransactionById(transactionId: number): boolean {
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
}
