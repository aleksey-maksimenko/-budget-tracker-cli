import { Account, Transaction, AccountManager } from "./classes";

const manager = new AccountManager();
// счет с транзакциями из прошлой работы
const mainAccount = new Account(1, "Личный бюджет");
mainAccount.addTransaction(
  new Transaction(
    1,
    50000,
    "income",
    new Date("2025-01-01").toISOString(),
    "Зарплата"
  )
);
mainAccount.addTransaction(
  new Transaction(
    2,
    15000,
    "expense",
    new Date("2025-01-05").toISOString(),
    "Покупка продуктов"
  )
);
mainAccount.addTransaction(
  new Transaction(
    3,
    5000,
    "expense",
    new Date("2025-01-10").toISOString(),
    "Интернет и связь"
  )
);
manager.addAccount(mainAccount);

// еще один счет
const savingsAccount = new Account(2, "Накопления");
savingsAccount.addTransaction(
  new Transaction(
    1,
    20000,
    "income",
    new Date("2025-10-01").toISOString(),
    "Пополнение накопительного"
  )
);
savingsAccount.addTransaction(
  new Transaction(
    2,
    3000,
    "expense",
    new Date("2025-10-15").toISOString(),
    "Перевод на брокерский счёт"
  )
);
manager.addAccount(savingsAccount);

console.log("\n1) Все счета в менеджере");
console.log(manager.getAccounts());
console.log("\n2) Получение счёта по Id");
const found = manager.getAccountById(1);
console.log(found ? found.toString() : "Счёт не найден");
console.log("\nОбщая сводка по всем счетам");
console.log(manager.getSummary());
console.log("\nОбщая сводка (строка)");
console.log(manager.getSummaryString());
console.log("\nПолная информация всех счетов");
console.log(manager.toString());
console.log("\n3) Удаление счёта с ID = 2");
const removed = manager.removeAccountById(2);
console.log("Удалён:", removed);
console.log("\n   Счета после удаления");
console.log(manager.getAccounts());
console.log("\n   Обновленная сводка");
console.log(manager.getSummaryString());
