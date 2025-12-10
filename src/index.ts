import { Transaction } from './classes/Transaction.js';
import { Account } from './classes/Account.js';
import { AccountManager } from './classes/AccountManager.js';

function main() {
  console.log('Budget Tracker CLI\n');
  // ID больше не передаем
  const personalAccount = new Account("Личный бюджет");
  personalAccount.addTransaction(
    new Transaction(
      50000,
      "income",
      new Date("2025-01-01").toISOString(),
      "Зарплата"
    )
  );
  personalAccount.addTransaction(
    new Transaction(
      15000,
      "expense",
      new Date("2025-01-05").toISOString(),
      "Покупка продуктов"
    )
  );
  personalAccount.addTransaction(
    new Transaction(
      5000,
      "expense",
      new Date("2025-01-10").toISOString(),
      "Интернет и связь"
    )
  );

  const manager = new AccountManager();
  manager.addAccount(personalAccount);
  
  console.log(personalAccount.toString());
  console.log(`Общая информация (от менеджера): ${manager.getSummaryString()}`);
  console.log("\nТранзакции личного бюджета:");
  personalAccount.getTransactions().forEach((t) =>
    console.log(t.toString())
  );
  
  // для удаления счета теперь используем его строковый ID
  console.log("\nУдаление счёта:");
  const accountIdToDelete = personalAccount.id; // Получаем сгенерированный ID
  const result = manager.removeAccountById(accountIdToDelete);
  console.log(result ? `Счёт с ID ${accountIdToDelete} удалён успешно` : "Счёт не найден");
}

main();