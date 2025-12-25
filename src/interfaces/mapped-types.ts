import { ITransaction } from "./ITransaction";

// mapped type: указанные поля становятся опциональными
export type OptionalTransaction<
  TFields extends keyof ITransaction
> =
  // поля из TFields опциональны
  {
    [K in TFields]?: ITransaction[K];
  }
  &
  // остальные поля обязательными
  {
    [K in Exclude<keyof ITransaction, TFields>]: ITransaction[K];
  };

// mapped type: указанные поля становятся readonly
export type ReadonlyTransactionFields<
  TFields extends keyof ITransaction
> =
  {
    readonly [K in TFields]: ITransaction[K];
  }
  &
  {
    [K in Exclude<keyof ITransaction, TFields>]: ITransaction[K];
  };