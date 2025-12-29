import 'reflect-metadata';
import { Account } from './classes/Account.js';
import { Transaction } from './classes/Transaction.js';
import { AccountManager } from './classes/AccountManager.js';

const personalAccount = new Account('Личный бюджет');
personalAccount.addTransaction(new Transaction(50000, 'income', '2025-01-01', 'Зарплата'));
personalAccount.addTransaction(new Transaction(15000, 'expense', '2025-01-05', 'Продукты'));
personalAccount.addTransaction(new Transaction(5000, 'expense', '2025-01-10', 'Интернет'));

const manager = new AccountManager();
manager.addAccount(personalAccount);

console.log(personalAccount.getSummaryString());
console.log(personalAccount.getTransactions());
