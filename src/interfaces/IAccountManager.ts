namespace BudgetTracker {
  export interface IAccountManager {
    addAccount(account: Account): void;
    removeAccountById(accountId: number): boolean;
    getAccounts(): Account[];
    getAccountById(id: number): Account | undefined;
    getSummary(): ISummary;
    getSummaryString(): string;
    toString(): string;
    balance: number;
  }
}
