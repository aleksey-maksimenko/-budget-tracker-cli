namespace BudgetTracker {
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
}
