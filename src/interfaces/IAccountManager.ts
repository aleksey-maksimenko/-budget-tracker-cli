import { IAccount } from './IAccount.js';
import { ISummary } from './ISummary.js';

export interface IAccountManager {
  addAccount(account: IAccount): void;
  getAccounts(): IAccount[];
  removeAccountById(accountId: string): boolean; // было number
  getAccountById(id: string): IAccount | undefined;
  getSummary(): ISummary;
  getSummaryString(): string;
  toString(): string;
  balance: number;
}
