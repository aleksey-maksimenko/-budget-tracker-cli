"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// реализация счёта с интерфейсом IAccount
const createAccount = (id, name) => {
    const transactions = [];
    return {
        id,
        name,
        addTransaction(transaction) {
            transactions.push(transaction);
        },
        removeTransactionById(transactionId) {
            const index = transactions.findIndex(t => t.id === transactionId);
            if (index >= 0) {
                transactions.splice(index, 1);
                return true;
            }
            return false;
        },
        getTransactions() {
            return transactions;
        }
    };
};
// менеджер счетов
const createAccountManager = () => {
    const accounts = [];
    return {
        addAccount(account) {
            accounts.push(account);
        },
        removeAccountById(accountId) {
            const index = accounts.findIndex(a => a.id === accountId);
            if (index >= 0) {
                accounts.splice(index, 1);
                return true;
            }
            return false;
        },
        getAccounts() {
            return accounts;
        },
        getAccountById(id) {
            return accounts.find(a => a.id === id);
        },
        getSummary(accountId) {
            const account = this.getAccountById(accountId);
            if (!account)
                return { income: 0, expenses: 0, balance: 0 };
            const transactions = account.getTransactions();
            let income = 0;
            let expenses = 0;
            for (let i = 0; i < transactions.length; i++) {
                const transaction = transactions[i];
                if (transaction.type === "income") {
                    income += transaction.amount;
                }
                else if (transaction.type === "expense") {
                    expenses += transaction.amount;
                }
            }
            return {
                income,
                expenses,
                balance: income - expenses
            };
        }
    };
};
// cоздаём менеджер счетов и счет, проверяем работу
const manager = createAccountManager();
const myAccount = createAccount(1, "СЧЕТ ПЕРВЫЙ");
myAccount.addTransaction({
    id: 1,
    amount: 50000,
    type: "income",
    date: new Date().toISOString(),
    description: "Зарплата"
});
myAccount.addTransaction({
    id: 2,
    amount: 15000,
    type: "expense",
    date: new Date().toISOString(),
    description: "Продукты"
});
myAccount.addTransaction({
    id: 3,
    amount: 5000,
    type: "expense",
    date: new Date().toISOString(),
    description: "Связь, абонентские платы"
});
// счёт в менеджер
manager.addAccount(myAccount);
console.log("Список счетов:", manager.getAccounts());
console.log("Транзакции:", myAccount.getTransactions());
console.log("Сводка:", manager.getSummary(1));
// удалим транзакцию
myAccount.removeTransactionById(2);
console.log("\nПосле удаления транзакции:", myAccount.getTransactions());
console.log("Новая сводка:", manager.getSummary(1));
