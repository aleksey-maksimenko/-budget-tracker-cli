import { Transaction } from './classes/Transaction.js';
import { Account } from './classes/Account.js';
import { AccountManager } from './classes/AccountManager.js';
import { CategoryLimits } from './interfaces/utility-types.js';

function main() {
  console.log('Budget Tracker CLI (утилитные типы)\n');
  const personalAccount = new Account('Личный бюджет');
  console.log(`Создан счет: "${personalAccount.name}" (ID: ${personalAccount.id.slice(0, 8)})`);
  personalAccount.addTransaction(
    new Transaction(
      50000,
      'income',
      new Date('2025-01-01').toISOString(),
      'Зарплата за январь'
    )
  );
  personalAccount.addTransaction(
    new Transaction(
      15000,
      'expense',
      new Date('2025-01-05').toISOString(),
      'Продукты на неделю'
    )
  );
  personalAccount.addTransaction(
    new Transaction(
      5000,
      'expense',
      new Date('2025-01-10').toISOString(),
      'Оплата интернета'
    )
  );

  // лимиты
  const monthlyLimits: CategoryLimits = {
    income: 100000,   
    expense: 30000    
  };
  console.log('\nУстановленные лимиты (Record<TransactionType, number>):');
  console.log(`  Максимальный доход: ${monthlyLimits.income.toLocaleString()} ₽`);
  console.log(`  Лимит расходов: ${monthlyLimits.expense.toLocaleString()} ₽`);

  const manager = new AccountManager();
  manager.addAccount(personalAccount);

  // Partial<T> - частичное обновление
  console.log('\nPartial<ITransaction>:');
  const transactions = personalAccount.getTransactions();
  if (transactions.length > 0) {
    const firstTransaction = transactions[0];
    console.log('  До обновления:');
    console.log(`  ${firstTransaction.toString()}`);
    console.log('\n  Обновляем сумму и описание...');
    firstTransaction.update({
      amount: 55000,
      description: 'Зарплата + новогодняя премия'
    });
    console.log('  После обновления:');
    console.log(`  ${firstTransaction.toString()}`);
  }

  //  Partial<IAccount> - обновление счета
  console.log('\nPartial<IAccount>:');
  console.log(`  До обновления: "${personalAccount.name}"`);
  personalAccount.update({ 
    name: 'Основной личный бюджет 2025' 
  });
  console.log(`  После обновления: "${personalAccount.name}"`);

  console.log('\nИнформация о счете:');
  console.log(personalAccount.toString());
  const summary = personalAccount.getSummary();
  console.log('\n Проверка лимитов:');
  console.log(`  Фактический доход: ${summary.income.toLocaleString()} ₽ / Лимит: ${monthlyLimits.income.toLocaleString()} ₽`);
  console.log(`  Фактические расходы: ${summary.expenses.toLocaleString()} ₽ / Лимит: ${monthlyLimits.expense.toLocaleString()} ₽`);
  if (summary.expenses > monthlyLimits.expense) {
    console.log('  Превышен лимит расходов!');
  } else {
    console.log('  Расходы в пределах лимита');
  }

  console.log(`\n Общая информация от AccountManager:`);
  console.log(`  ${manager.getSummaryString()}`);

  // 1Omit<ITransaction, 'description'>
  console.log('\n Omit<ITransaction, "description">:');
  console.log('  Транзакции без описания (только ID, сумма, тип, дата):');
  const transactionsWithoutDesc = transactions.map(t => {
    const { id, amount, type, date } = t;
    return { id: id.slice(0, 8), amount, type, date: date.split('T')[0] };
  });
  
  transactionsWithoutDesc.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.id} | ${t.type} | ${t.amount.toLocaleString()} ₽ | ${t.date}`);
  });

  // Pick<IAccount, 'id' | 'name'>
  console.log('\nPick<IAccount, "id" | "name">:');
  const accountInfo = {
    id: personalAccount.id.slice(0, 8),
    name: personalAccount.name
  };
  console.log(`  Минимальная информация о счете: ${accountInfo.name} (${accountInfo.id})`);

  // удаление счета
  console.log('\nУдаление счета:');
  console.log(`  Пытаемся удалить счет с ID: ${personalAccount.id.slice(0, 8)}`);
  const result = manager.removeAccountById(personalAccount.id);
  if (result) {
    console.log(`   Счет успешно удален`);
    console.log(`  Осталось счетов: ${manager.getAccounts().length}`);
  } else {
    console.log(`   Счет не найден`);
  }
  console.log('\n Попытка изменить ID транзакции:');
  try {
    if (transactions.length > 0) {
      transactions[0].update({ id: 'new-id' } as any);
    }
  } catch (error) {
    console.log(`  Ошибка: ${(error as Error).message}`);
  }
}

main();