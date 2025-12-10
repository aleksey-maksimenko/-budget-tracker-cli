import { ITransaction } from './ITransaction.js';
import { IAccount } from './IAccount.js';
import { Transaction } from '../classes/Transaction.js';
import { TransactionType } from './TransactionType.js';

// Частичное обновление
export type TransactionUpdate = Partial<ITransaction>;
export type AccountUpdate = Partial<IAccount>;

// обязательные поля и исключения
export type CompleteTransaction = Required<ITransaction>;
export type TransactionWithoutDescription = Omit<ITransaction, 'description'>;

// выборка ключевых полей
export type TransactionPreview = Pick<ITransaction, 'id' | 'amount' | 'type' | 'date'>;
export type AccountInfo = Pick<IAccount, 'id' | 'name'>;

// словарь лимитов по категориям
export type CategoryLimits = Record<TransactionType, number>;

// типы функций
export type TransactionConstructorParams = ConstructorParameters<typeof Transaction>;
export type TransactionInstance = InstanceType<typeof Transaction>;

// Nullable поля
export type NullableDescription = string | null;