import { Transaction } from './classes/Transaction.js';
import { Account } from './classes/Account.js';
import { AccountManager } from './classes/AccountManager.js';
import { CategoryLimits } from './interfaces/utility-types.js';

import { ITransaction } from "./interfaces/ITransaction";
import {
  TransactionFieldType,
  IsIncome
} from "./interfaces/utility-types";
import {
  OptionalTransaction,
  ReadonlyTransactionFields
} from "./interfaces/mapped-types";

function main() {
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

  // получение типа конкретного поля
  type AmountType = TransactionFieldType<"amount">; // number
  type UnknownType = TransactionFieldType<"unknown">; // never
  // транзакция с опциональными description и date
  type TransactionOpt =
    OptionalTransaction<"description" | "date">;
  // транзакция с readonly id и type
  type TransactionReadonly =
    ReadonlyTransactionFields<"id" | "type">;
  // проверка доходной транзакции
  type CheckIncome1 = IsIncome<{ type: "income"; amount: number }>; // true
  type CheckIncome2 = IsIncome<{ type: "expense"; amount: number }>; // false
  type CheckIncome3 = IsIncome<ITransaction>; // false
}

main();