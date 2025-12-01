/// <reference path="./interfaces/TransactionType.ts" />
/// <reference path="./interfaces/ISummary.ts" />
/// <reference path="./interfaces/ITransaction.ts" />
/// <reference path="./interfaces/IAccount.ts" />
/// <reference path="./interfaces/IAccountManager.ts" />
/// <reference path="./classes/Transaction.ts" />
/// <reference path="./classes/Account.ts" />
/// <reference path="./classes/AccountManager.ts" />

const personalAccount = new BudgetTracker.Account(1, "Личный бюджет");
personalAccount.addTransaction(
  new BudgetTracker.Transaction(
    1,
    50000,
    "income",
    new Date("2025-01-01").toISOString(),
    "Зарплата"
  )
);
personalAccount.addTransaction(
  new BudgetTracker.Transaction(
    2,
    15000,
    "expense",
    new Date("2025-01-05").toISOString(),
    "Покупка продуктов"
  )
);
personalAccount.addTransaction(
  new BudgetTracker.Transaction(
    3,
    5000,
    "expense",
    new Date("2025-01-10").toISOString(),
    "Интернет и связь"
  )
);

const manager = new BudgetTracker.AccountManager();
manager.addAccount(personalAccount);
console.log(personalAccount.toString());
console.log(`Общий баланс всех бюджетов: ${manager.balance} ₽`);
console.log("\nТранзакции личного бюджета:");
personalAccount.getTransactions().forEach((t) =>
  console.log(t.toString())
);
console.log("\n3) Удаление счёта с ID = 1");
console.log(manager.removeAccountById(1));
