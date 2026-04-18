
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model MonthlyExpenseAnalysis
 * 
 */
export type MonthlyExpenseAnalysis = $Result.DefaultSelection<Prisma.$MonthlyExpenseAnalysisPayload>
/**
 * Model ExpenseCategory
 * 
 */
export type ExpenseCategory = $Result.DefaultSelection<Prisma.$ExpenseCategoryPayload>
/**
 * Model IncomeCategory
 * 
 */
export type IncomeCategory = $Result.DefaultSelection<Prisma.$IncomeCategoryPayload>
/**
 * Model PaymentMethod
 * 
 */
export type PaymentMethod = $Result.DefaultSelection<Prisma.$PaymentMethodPayload>
/**
 * Model ImportChannelPayment
 * 
 */
export type ImportChannelPayment = $Result.DefaultSelection<Prisma.$ImportChannelPaymentPayload>
/**
 * Model AiPrompt
 * 
 */
export type AiPrompt = $Result.DefaultSelection<Prisma.$AiPromptPayload>
/**
 * Model AiPromptVersion
 * 
 */
export type AiPromptVersion = $Result.DefaultSelection<Prisma.$AiPromptVersionPayload>
/**
 * Model CategoryRule
 * 
 */
export type CategoryRule = $Result.DefaultSelection<Prisma.$CategoryRulePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TransactionType: {
  income: 'income',
  expense: 'expense'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]

}

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Transactions
 * const transactions = await prisma.transaction.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Transactions
   * const transactions = await prisma.transaction.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.monthlyExpenseAnalysis`: Exposes CRUD operations for the **MonthlyExpenseAnalysis** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MonthlyExpenseAnalyses
    * const monthlyExpenseAnalyses = await prisma.monthlyExpenseAnalysis.findMany()
    * ```
    */
  get monthlyExpenseAnalysis(): Prisma.MonthlyExpenseAnalysisDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expenseCategory`: Exposes CRUD operations for the **ExpenseCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExpenseCategories
    * const expenseCategories = await prisma.expenseCategory.findMany()
    * ```
    */
  get expenseCategory(): Prisma.ExpenseCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.incomeCategory`: Exposes CRUD operations for the **IncomeCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IncomeCategories
    * const incomeCategories = await prisma.incomeCategory.findMany()
    * ```
    */
  get incomeCategory(): Prisma.IncomeCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentMethod`: Exposes CRUD operations for the **PaymentMethod** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentMethods
    * const paymentMethods = await prisma.paymentMethod.findMany()
    * ```
    */
  get paymentMethod(): Prisma.PaymentMethodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.importChannelPayment`: Exposes CRUD operations for the **ImportChannelPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ImportChannelPayments
    * const importChannelPayments = await prisma.importChannelPayment.findMany()
    * ```
    */
  get importChannelPayment(): Prisma.ImportChannelPaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiPrompt`: Exposes CRUD operations for the **AiPrompt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiPrompts
    * const aiPrompts = await prisma.aiPrompt.findMany()
    * ```
    */
  get aiPrompt(): Prisma.AiPromptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiPromptVersion`: Exposes CRUD operations for the **AiPromptVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiPromptVersions
    * const aiPromptVersions = await prisma.aiPromptVersion.findMany()
    * ```
    */
  get aiPromptVersion(): Prisma.AiPromptVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoryRule`: Exposes CRUD operations for the **CategoryRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategoryRules
    * const categoryRules = await prisma.categoryRule.findMany()
    * ```
    */
  get categoryRule(): Prisma.CategoryRuleDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Transaction: 'Transaction',
    MonthlyExpenseAnalysis: 'MonthlyExpenseAnalysis',
    ExpenseCategory: 'ExpenseCategory',
    IncomeCategory: 'IncomeCategory',
    PaymentMethod: 'PaymentMethod',
    ImportChannelPayment: 'ImportChannelPayment',
    AiPrompt: 'AiPrompt',
    AiPromptVersion: 'AiPromptVersion',
    CategoryRule: 'CategoryRule'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "transaction" | "monthlyExpenseAnalysis" | "expenseCategory" | "incomeCategory" | "paymentMethod" | "importChannelPayment" | "aiPrompt" | "aiPromptVersion" | "categoryRule"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      MonthlyExpenseAnalysis: {
        payload: Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>
        fields: Prisma.MonthlyExpenseAnalysisFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MonthlyExpenseAnalysisFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MonthlyExpenseAnalysisFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload>
          }
          findFirst: {
            args: Prisma.MonthlyExpenseAnalysisFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MonthlyExpenseAnalysisFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload>
          }
          findMany: {
            args: Prisma.MonthlyExpenseAnalysisFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload>[]
          }
          create: {
            args: Prisma.MonthlyExpenseAnalysisCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload>
          }
          createMany: {
            args: Prisma.MonthlyExpenseAnalysisCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MonthlyExpenseAnalysisCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload>[]
          }
          delete: {
            args: Prisma.MonthlyExpenseAnalysisDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload>
          }
          update: {
            args: Prisma.MonthlyExpenseAnalysisUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload>
          }
          deleteMany: {
            args: Prisma.MonthlyExpenseAnalysisDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MonthlyExpenseAnalysisUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MonthlyExpenseAnalysisUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload>[]
          }
          upsert: {
            args: Prisma.MonthlyExpenseAnalysisUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MonthlyExpenseAnalysisPayload>
          }
          aggregate: {
            args: Prisma.MonthlyExpenseAnalysisAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMonthlyExpenseAnalysis>
          }
          groupBy: {
            args: Prisma.MonthlyExpenseAnalysisGroupByArgs<ExtArgs>
            result: $Utils.Optional<MonthlyExpenseAnalysisGroupByOutputType>[]
          }
          count: {
            args: Prisma.MonthlyExpenseAnalysisCountArgs<ExtArgs>
            result: $Utils.Optional<MonthlyExpenseAnalysisCountAggregateOutputType> | number
          }
        }
      }
      ExpenseCategory: {
        payload: Prisma.$ExpenseCategoryPayload<ExtArgs>
        fields: Prisma.ExpenseCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          findFirst: {
            args: Prisma.ExpenseCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          findMany: {
            args: Prisma.ExpenseCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          create: {
            args: Prisma.ExpenseCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          createMany: {
            args: Prisma.ExpenseCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          delete: {
            args: Prisma.ExpenseCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          update: {
            args: Prisma.ExpenseCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ExpenseCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          upsert: {
            args: Prisma.ExpenseCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          aggregate: {
            args: Prisma.ExpenseCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenseCategory>
          }
          groupBy: {
            args: Prisma.ExpenseCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCategoryCountAggregateOutputType> | number
          }
        }
      }
      IncomeCategory: {
        payload: Prisma.$IncomeCategoryPayload<ExtArgs>
        fields: Prisma.IncomeCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IncomeCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IncomeCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload>
          }
          findFirst: {
            args: Prisma.IncomeCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IncomeCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload>
          }
          findMany: {
            args: Prisma.IncomeCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload>[]
          }
          create: {
            args: Prisma.IncomeCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload>
          }
          createMany: {
            args: Prisma.IncomeCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IncomeCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload>[]
          }
          delete: {
            args: Prisma.IncomeCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload>
          }
          update: {
            args: Prisma.IncomeCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload>
          }
          deleteMany: {
            args: Prisma.IncomeCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IncomeCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IncomeCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload>[]
          }
          upsert: {
            args: Prisma.IncomeCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncomeCategoryPayload>
          }
          aggregate: {
            args: Prisma.IncomeCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIncomeCategory>
          }
          groupBy: {
            args: Prisma.IncomeCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<IncomeCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.IncomeCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<IncomeCategoryCountAggregateOutputType> | number
          }
        }
      }
      PaymentMethod: {
        payload: Prisma.$PaymentMethodPayload<ExtArgs>
        fields: Prisma.PaymentMethodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentMethodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentMethodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload>
          }
          findFirst: {
            args: Prisma.PaymentMethodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentMethodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload>
          }
          findMany: {
            args: Prisma.PaymentMethodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload>[]
          }
          create: {
            args: Prisma.PaymentMethodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload>
          }
          createMany: {
            args: Prisma.PaymentMethodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentMethodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload>[]
          }
          delete: {
            args: Prisma.PaymentMethodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload>
          }
          update: {
            args: Prisma.PaymentMethodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload>
          }
          deleteMany: {
            args: Prisma.PaymentMethodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentMethodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentMethodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload>[]
          }
          upsert: {
            args: Prisma.PaymentMethodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentMethodPayload>
          }
          aggregate: {
            args: Prisma.PaymentMethodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentMethod>
          }
          groupBy: {
            args: Prisma.PaymentMethodGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentMethodGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentMethodCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentMethodCountAggregateOutputType> | number
          }
        }
      }
      ImportChannelPayment: {
        payload: Prisma.$ImportChannelPaymentPayload<ExtArgs>
        fields: Prisma.ImportChannelPaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ImportChannelPaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ImportChannelPaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload>
          }
          findFirst: {
            args: Prisma.ImportChannelPaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ImportChannelPaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload>
          }
          findMany: {
            args: Prisma.ImportChannelPaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload>[]
          }
          create: {
            args: Prisma.ImportChannelPaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload>
          }
          createMany: {
            args: Prisma.ImportChannelPaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ImportChannelPaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload>[]
          }
          delete: {
            args: Prisma.ImportChannelPaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload>
          }
          update: {
            args: Prisma.ImportChannelPaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload>
          }
          deleteMany: {
            args: Prisma.ImportChannelPaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ImportChannelPaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ImportChannelPaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload>[]
          }
          upsert: {
            args: Prisma.ImportChannelPaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ImportChannelPaymentPayload>
          }
          aggregate: {
            args: Prisma.ImportChannelPaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateImportChannelPayment>
          }
          groupBy: {
            args: Prisma.ImportChannelPaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ImportChannelPaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ImportChannelPaymentCountArgs<ExtArgs>
            result: $Utils.Optional<ImportChannelPaymentCountAggregateOutputType> | number
          }
        }
      }
      AiPrompt: {
        payload: Prisma.$AiPromptPayload<ExtArgs>
        fields: Prisma.AiPromptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiPromptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiPromptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload>
          }
          findFirst: {
            args: Prisma.AiPromptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiPromptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload>
          }
          findMany: {
            args: Prisma.AiPromptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload>[]
          }
          create: {
            args: Prisma.AiPromptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload>
          }
          createMany: {
            args: Prisma.AiPromptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiPromptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload>[]
          }
          delete: {
            args: Prisma.AiPromptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload>
          }
          update: {
            args: Prisma.AiPromptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload>
          }
          deleteMany: {
            args: Prisma.AiPromptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiPromptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiPromptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload>[]
          }
          upsert: {
            args: Prisma.AiPromptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptPayload>
          }
          aggregate: {
            args: Prisma.AiPromptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiPrompt>
          }
          groupBy: {
            args: Prisma.AiPromptGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiPromptGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiPromptCountArgs<ExtArgs>
            result: $Utils.Optional<AiPromptCountAggregateOutputType> | number
          }
        }
      }
      AiPromptVersion: {
        payload: Prisma.$AiPromptVersionPayload<ExtArgs>
        fields: Prisma.AiPromptVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiPromptVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiPromptVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload>
          }
          findFirst: {
            args: Prisma.AiPromptVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiPromptVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload>
          }
          findMany: {
            args: Prisma.AiPromptVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload>[]
          }
          create: {
            args: Prisma.AiPromptVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload>
          }
          createMany: {
            args: Prisma.AiPromptVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiPromptVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload>[]
          }
          delete: {
            args: Prisma.AiPromptVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload>
          }
          update: {
            args: Prisma.AiPromptVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload>
          }
          deleteMany: {
            args: Prisma.AiPromptVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiPromptVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiPromptVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload>[]
          }
          upsert: {
            args: Prisma.AiPromptVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiPromptVersionPayload>
          }
          aggregate: {
            args: Prisma.AiPromptVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiPromptVersion>
          }
          groupBy: {
            args: Prisma.AiPromptVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiPromptVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiPromptVersionCountArgs<ExtArgs>
            result: $Utils.Optional<AiPromptVersionCountAggregateOutputType> | number
          }
        }
      }
      CategoryRule: {
        payload: Prisma.$CategoryRulePayload<ExtArgs>
        fields: Prisma.CategoryRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload>
          }
          findFirst: {
            args: Prisma.CategoryRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload>
          }
          findMany: {
            args: Prisma.CategoryRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload>[]
          }
          create: {
            args: Prisma.CategoryRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload>
          }
          createMany: {
            args: Prisma.CategoryRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload>[]
          }
          delete: {
            args: Prisma.CategoryRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload>
          }
          update: {
            args: Prisma.CategoryRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload>
          }
          deleteMany: {
            args: Prisma.CategoryRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryRuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload>[]
          }
          upsert: {
            args: Prisma.CategoryRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryRulePayload>
          }
          aggregate: {
            args: Prisma.CategoryRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoryRule>
          }
          groupBy: {
            args: Prisma.CategoryRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryRuleCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryRuleCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    transaction?: TransactionOmit
    monthlyExpenseAnalysis?: MonthlyExpenseAnalysisOmit
    expenseCategory?: ExpenseCategoryOmit
    incomeCategory?: IncomeCategoryOmit
    paymentMethod?: PaymentMethodOmit
    importChannelPayment?: ImportChannelPaymentOmit
    aiPrompt?: AiPromptOmit
    aiPromptVersion?: AiPromptVersionOmit
    categoryRule?: CategoryRuleOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PaymentMethodCountOutputType
   */

  export type PaymentMethodCountOutputType = {
    importChannelPayments: number
  }

  export type PaymentMethodCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    importChannelPayments?: boolean | PaymentMethodCountOutputTypeCountImportChannelPaymentsArgs
  }

  // Custom InputTypes
  /**
   * PaymentMethodCountOutputType without action
   */
  export type PaymentMethodCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethodCountOutputType
     */
    select?: PaymentMethodCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentMethodCountOutputType without action
   */
  export type PaymentMethodCountOutputTypeCountImportChannelPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportChannelPaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    date: Date | null
    name: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    category: string | null
    account: string | null
    note: string | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    name: string | null
    type: $Enums.TransactionType | null
    amount: Decimal | null
    category: string | null
    account: string | null
    note: string | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    date: number
    name: number
    type: number
    amount: number
    category: number
    account: number
    note: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    date?: true
    name?: true
    type?: true
    amount?: true
    category?: true
    account?: true
    note?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    date?: true
    name?: true
    type?: true
    amount?: true
    category?: true
    account?: true
    note?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    date?: true
    name?: true
    type?: true
    amount?: true
    category?: true
    account?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    date: Date
    name: string
    type: $Enums.TransactionType
    amount: Decimal
    category: string
    account: string
    note: string | null
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    category?: boolean
    account?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    category?: boolean
    account?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    category?: boolean
    account?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    date?: boolean
    name?: boolean
    type?: boolean
    amount?: boolean
    category?: boolean
    account?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "name" | "type" | "amount" | "category" | "account" | "note" | "createdAt", ExtArgs["result"]["transaction"]>

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      name: string
      type: $Enums.TransactionType
      amount: Prisma.Decimal
      category: string
      account: string
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly name: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly category: FieldRef<"Transaction", 'String'>
    readonly account: FieldRef<"Transaction", 'String'>
    readonly note: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
  }


  /**
   * Model MonthlyExpenseAnalysis
   */

  export type AggregateMonthlyExpenseAnalysis = {
    _count: MonthlyExpenseAnalysisCountAggregateOutputType | null
    _min: MonthlyExpenseAnalysisMinAggregateOutputType | null
    _max: MonthlyExpenseAnalysisMaxAggregateOutputType | null
  }

  export type MonthlyExpenseAnalysisMinAggregateOutputType = {
    id: string | null
    month: string | null
    type: string | null
    content: string | null
    createdAt: Date | null
  }

  export type MonthlyExpenseAnalysisMaxAggregateOutputType = {
    id: string | null
    month: string | null
    type: string | null
    content: string | null
    createdAt: Date | null
  }

  export type MonthlyExpenseAnalysisCountAggregateOutputType = {
    id: number
    month: number
    type: number
    content: number
    createdAt: number
    _all: number
  }


  export type MonthlyExpenseAnalysisMinAggregateInputType = {
    id?: true
    month?: true
    type?: true
    content?: true
    createdAt?: true
  }

  export type MonthlyExpenseAnalysisMaxAggregateInputType = {
    id?: true
    month?: true
    type?: true
    content?: true
    createdAt?: true
  }

  export type MonthlyExpenseAnalysisCountAggregateInputType = {
    id?: true
    month?: true
    type?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type MonthlyExpenseAnalysisAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyExpenseAnalysis to aggregate.
     */
    where?: MonthlyExpenseAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyExpenseAnalyses to fetch.
     */
    orderBy?: MonthlyExpenseAnalysisOrderByWithRelationInput | MonthlyExpenseAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MonthlyExpenseAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyExpenseAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyExpenseAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MonthlyExpenseAnalyses
    **/
    _count?: true | MonthlyExpenseAnalysisCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MonthlyExpenseAnalysisMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MonthlyExpenseAnalysisMaxAggregateInputType
  }

  export type GetMonthlyExpenseAnalysisAggregateType<T extends MonthlyExpenseAnalysisAggregateArgs> = {
        [P in keyof T & keyof AggregateMonthlyExpenseAnalysis]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMonthlyExpenseAnalysis[P]>
      : GetScalarType<T[P], AggregateMonthlyExpenseAnalysis[P]>
  }




  export type MonthlyExpenseAnalysisGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MonthlyExpenseAnalysisWhereInput
    orderBy?: MonthlyExpenseAnalysisOrderByWithAggregationInput | MonthlyExpenseAnalysisOrderByWithAggregationInput[]
    by: MonthlyExpenseAnalysisScalarFieldEnum[] | MonthlyExpenseAnalysisScalarFieldEnum
    having?: MonthlyExpenseAnalysisScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MonthlyExpenseAnalysisCountAggregateInputType | true
    _min?: MonthlyExpenseAnalysisMinAggregateInputType
    _max?: MonthlyExpenseAnalysisMaxAggregateInputType
  }

  export type MonthlyExpenseAnalysisGroupByOutputType = {
    id: string
    month: string
    type: string
    content: string
    createdAt: Date
    _count: MonthlyExpenseAnalysisCountAggregateOutputType | null
    _min: MonthlyExpenseAnalysisMinAggregateOutputType | null
    _max: MonthlyExpenseAnalysisMaxAggregateOutputType | null
  }

  type GetMonthlyExpenseAnalysisGroupByPayload<T extends MonthlyExpenseAnalysisGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MonthlyExpenseAnalysisGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MonthlyExpenseAnalysisGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MonthlyExpenseAnalysisGroupByOutputType[P]>
            : GetScalarType<T[P], MonthlyExpenseAnalysisGroupByOutputType[P]>
        }
      >
    >


  export type MonthlyExpenseAnalysisSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    month?: boolean
    type?: boolean
    content?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["monthlyExpenseAnalysis"]>

  export type MonthlyExpenseAnalysisSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    month?: boolean
    type?: boolean
    content?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["monthlyExpenseAnalysis"]>

  export type MonthlyExpenseAnalysisSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    month?: boolean
    type?: boolean
    content?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["monthlyExpenseAnalysis"]>

  export type MonthlyExpenseAnalysisSelectScalar = {
    id?: boolean
    month?: boolean
    type?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type MonthlyExpenseAnalysisOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "month" | "type" | "content" | "createdAt", ExtArgs["result"]["monthlyExpenseAnalysis"]>

  export type $MonthlyExpenseAnalysisPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MonthlyExpenseAnalysis"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      month: string
      type: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["monthlyExpenseAnalysis"]>
    composites: {}
  }

  type MonthlyExpenseAnalysisGetPayload<S extends boolean | null | undefined | MonthlyExpenseAnalysisDefaultArgs> = $Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload, S>

  type MonthlyExpenseAnalysisCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MonthlyExpenseAnalysisFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MonthlyExpenseAnalysisCountAggregateInputType | true
    }

  export interface MonthlyExpenseAnalysisDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MonthlyExpenseAnalysis'], meta: { name: 'MonthlyExpenseAnalysis' } }
    /**
     * Find zero or one MonthlyExpenseAnalysis that matches the filter.
     * @param {MonthlyExpenseAnalysisFindUniqueArgs} args - Arguments to find a MonthlyExpenseAnalysis
     * @example
     * // Get one MonthlyExpenseAnalysis
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MonthlyExpenseAnalysisFindUniqueArgs>(args: SelectSubset<T, MonthlyExpenseAnalysisFindUniqueArgs<ExtArgs>>): Prisma__MonthlyExpenseAnalysisClient<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MonthlyExpenseAnalysis that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MonthlyExpenseAnalysisFindUniqueOrThrowArgs} args - Arguments to find a MonthlyExpenseAnalysis
     * @example
     * // Get one MonthlyExpenseAnalysis
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MonthlyExpenseAnalysisFindUniqueOrThrowArgs>(args: SelectSubset<T, MonthlyExpenseAnalysisFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MonthlyExpenseAnalysisClient<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyExpenseAnalysis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyExpenseAnalysisFindFirstArgs} args - Arguments to find a MonthlyExpenseAnalysis
     * @example
     * // Get one MonthlyExpenseAnalysis
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MonthlyExpenseAnalysisFindFirstArgs>(args?: SelectSubset<T, MonthlyExpenseAnalysisFindFirstArgs<ExtArgs>>): Prisma__MonthlyExpenseAnalysisClient<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MonthlyExpenseAnalysis that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyExpenseAnalysisFindFirstOrThrowArgs} args - Arguments to find a MonthlyExpenseAnalysis
     * @example
     * // Get one MonthlyExpenseAnalysis
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MonthlyExpenseAnalysisFindFirstOrThrowArgs>(args?: SelectSubset<T, MonthlyExpenseAnalysisFindFirstOrThrowArgs<ExtArgs>>): Prisma__MonthlyExpenseAnalysisClient<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MonthlyExpenseAnalyses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyExpenseAnalysisFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MonthlyExpenseAnalyses
     * const monthlyExpenseAnalyses = await prisma.monthlyExpenseAnalysis.findMany()
     * 
     * // Get first 10 MonthlyExpenseAnalyses
     * const monthlyExpenseAnalyses = await prisma.monthlyExpenseAnalysis.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const monthlyExpenseAnalysisWithIdOnly = await prisma.monthlyExpenseAnalysis.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MonthlyExpenseAnalysisFindManyArgs>(args?: SelectSubset<T, MonthlyExpenseAnalysisFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MonthlyExpenseAnalysis.
     * @param {MonthlyExpenseAnalysisCreateArgs} args - Arguments to create a MonthlyExpenseAnalysis.
     * @example
     * // Create one MonthlyExpenseAnalysis
     * const MonthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.create({
     *   data: {
     *     // ... data to create a MonthlyExpenseAnalysis
     *   }
     * })
     * 
     */
    create<T extends MonthlyExpenseAnalysisCreateArgs>(args: SelectSubset<T, MonthlyExpenseAnalysisCreateArgs<ExtArgs>>): Prisma__MonthlyExpenseAnalysisClient<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MonthlyExpenseAnalyses.
     * @param {MonthlyExpenseAnalysisCreateManyArgs} args - Arguments to create many MonthlyExpenseAnalyses.
     * @example
     * // Create many MonthlyExpenseAnalyses
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MonthlyExpenseAnalysisCreateManyArgs>(args?: SelectSubset<T, MonthlyExpenseAnalysisCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MonthlyExpenseAnalyses and returns the data saved in the database.
     * @param {MonthlyExpenseAnalysisCreateManyAndReturnArgs} args - Arguments to create many MonthlyExpenseAnalyses.
     * @example
     * // Create many MonthlyExpenseAnalyses
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MonthlyExpenseAnalyses and only return the `id`
     * const monthlyExpenseAnalysisWithIdOnly = await prisma.monthlyExpenseAnalysis.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MonthlyExpenseAnalysisCreateManyAndReturnArgs>(args?: SelectSubset<T, MonthlyExpenseAnalysisCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MonthlyExpenseAnalysis.
     * @param {MonthlyExpenseAnalysisDeleteArgs} args - Arguments to delete one MonthlyExpenseAnalysis.
     * @example
     * // Delete one MonthlyExpenseAnalysis
     * const MonthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.delete({
     *   where: {
     *     // ... filter to delete one MonthlyExpenseAnalysis
     *   }
     * })
     * 
     */
    delete<T extends MonthlyExpenseAnalysisDeleteArgs>(args: SelectSubset<T, MonthlyExpenseAnalysisDeleteArgs<ExtArgs>>): Prisma__MonthlyExpenseAnalysisClient<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MonthlyExpenseAnalysis.
     * @param {MonthlyExpenseAnalysisUpdateArgs} args - Arguments to update one MonthlyExpenseAnalysis.
     * @example
     * // Update one MonthlyExpenseAnalysis
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MonthlyExpenseAnalysisUpdateArgs>(args: SelectSubset<T, MonthlyExpenseAnalysisUpdateArgs<ExtArgs>>): Prisma__MonthlyExpenseAnalysisClient<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MonthlyExpenseAnalyses.
     * @param {MonthlyExpenseAnalysisDeleteManyArgs} args - Arguments to filter MonthlyExpenseAnalyses to delete.
     * @example
     * // Delete a few MonthlyExpenseAnalyses
     * const { count } = await prisma.monthlyExpenseAnalysis.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MonthlyExpenseAnalysisDeleteManyArgs>(args?: SelectSubset<T, MonthlyExpenseAnalysisDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyExpenseAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyExpenseAnalysisUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MonthlyExpenseAnalyses
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MonthlyExpenseAnalysisUpdateManyArgs>(args: SelectSubset<T, MonthlyExpenseAnalysisUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MonthlyExpenseAnalyses and returns the data updated in the database.
     * @param {MonthlyExpenseAnalysisUpdateManyAndReturnArgs} args - Arguments to update many MonthlyExpenseAnalyses.
     * @example
     * // Update many MonthlyExpenseAnalyses
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MonthlyExpenseAnalyses and only return the `id`
     * const monthlyExpenseAnalysisWithIdOnly = await prisma.monthlyExpenseAnalysis.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MonthlyExpenseAnalysisUpdateManyAndReturnArgs>(args: SelectSubset<T, MonthlyExpenseAnalysisUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MonthlyExpenseAnalysis.
     * @param {MonthlyExpenseAnalysisUpsertArgs} args - Arguments to update or create a MonthlyExpenseAnalysis.
     * @example
     * // Update or create a MonthlyExpenseAnalysis
     * const monthlyExpenseAnalysis = await prisma.monthlyExpenseAnalysis.upsert({
     *   create: {
     *     // ... data to create a MonthlyExpenseAnalysis
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MonthlyExpenseAnalysis we want to update
     *   }
     * })
     */
    upsert<T extends MonthlyExpenseAnalysisUpsertArgs>(args: SelectSubset<T, MonthlyExpenseAnalysisUpsertArgs<ExtArgs>>): Prisma__MonthlyExpenseAnalysisClient<$Result.GetResult<Prisma.$MonthlyExpenseAnalysisPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MonthlyExpenseAnalyses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyExpenseAnalysisCountArgs} args - Arguments to filter MonthlyExpenseAnalyses to count.
     * @example
     * // Count the number of MonthlyExpenseAnalyses
     * const count = await prisma.monthlyExpenseAnalysis.count({
     *   where: {
     *     // ... the filter for the MonthlyExpenseAnalyses we want to count
     *   }
     * })
    **/
    count<T extends MonthlyExpenseAnalysisCountArgs>(
      args?: Subset<T, MonthlyExpenseAnalysisCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MonthlyExpenseAnalysisCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MonthlyExpenseAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyExpenseAnalysisAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MonthlyExpenseAnalysisAggregateArgs>(args: Subset<T, MonthlyExpenseAnalysisAggregateArgs>): Prisma.PrismaPromise<GetMonthlyExpenseAnalysisAggregateType<T>>

    /**
     * Group by MonthlyExpenseAnalysis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MonthlyExpenseAnalysisGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MonthlyExpenseAnalysisGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MonthlyExpenseAnalysisGroupByArgs['orderBy'] }
        : { orderBy?: MonthlyExpenseAnalysisGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MonthlyExpenseAnalysisGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMonthlyExpenseAnalysisGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MonthlyExpenseAnalysis model
   */
  readonly fields: MonthlyExpenseAnalysisFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MonthlyExpenseAnalysis.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MonthlyExpenseAnalysisClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MonthlyExpenseAnalysis model
   */
  interface MonthlyExpenseAnalysisFieldRefs {
    readonly id: FieldRef<"MonthlyExpenseAnalysis", 'String'>
    readonly month: FieldRef<"MonthlyExpenseAnalysis", 'String'>
    readonly type: FieldRef<"MonthlyExpenseAnalysis", 'String'>
    readonly content: FieldRef<"MonthlyExpenseAnalysis", 'String'>
    readonly createdAt: FieldRef<"MonthlyExpenseAnalysis", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MonthlyExpenseAnalysis findUnique
   */
  export type MonthlyExpenseAnalysisFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyExpenseAnalysis to fetch.
     */
    where: MonthlyExpenseAnalysisWhereUniqueInput
  }

  /**
   * MonthlyExpenseAnalysis findUniqueOrThrow
   */
  export type MonthlyExpenseAnalysisFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyExpenseAnalysis to fetch.
     */
    where: MonthlyExpenseAnalysisWhereUniqueInput
  }

  /**
   * MonthlyExpenseAnalysis findFirst
   */
  export type MonthlyExpenseAnalysisFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyExpenseAnalysis to fetch.
     */
    where?: MonthlyExpenseAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyExpenseAnalyses to fetch.
     */
    orderBy?: MonthlyExpenseAnalysisOrderByWithRelationInput | MonthlyExpenseAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyExpenseAnalyses.
     */
    cursor?: MonthlyExpenseAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyExpenseAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyExpenseAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyExpenseAnalyses.
     */
    distinct?: MonthlyExpenseAnalysisScalarFieldEnum | MonthlyExpenseAnalysisScalarFieldEnum[]
  }

  /**
   * MonthlyExpenseAnalysis findFirstOrThrow
   */
  export type MonthlyExpenseAnalysisFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyExpenseAnalysis to fetch.
     */
    where?: MonthlyExpenseAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyExpenseAnalyses to fetch.
     */
    orderBy?: MonthlyExpenseAnalysisOrderByWithRelationInput | MonthlyExpenseAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MonthlyExpenseAnalyses.
     */
    cursor?: MonthlyExpenseAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyExpenseAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyExpenseAnalyses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MonthlyExpenseAnalyses.
     */
    distinct?: MonthlyExpenseAnalysisScalarFieldEnum | MonthlyExpenseAnalysisScalarFieldEnum[]
  }

  /**
   * MonthlyExpenseAnalysis findMany
   */
  export type MonthlyExpenseAnalysisFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * Filter, which MonthlyExpenseAnalyses to fetch.
     */
    where?: MonthlyExpenseAnalysisWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MonthlyExpenseAnalyses to fetch.
     */
    orderBy?: MonthlyExpenseAnalysisOrderByWithRelationInput | MonthlyExpenseAnalysisOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MonthlyExpenseAnalyses.
     */
    cursor?: MonthlyExpenseAnalysisWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MonthlyExpenseAnalyses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MonthlyExpenseAnalyses.
     */
    skip?: number
    distinct?: MonthlyExpenseAnalysisScalarFieldEnum | MonthlyExpenseAnalysisScalarFieldEnum[]
  }

  /**
   * MonthlyExpenseAnalysis create
   */
  export type MonthlyExpenseAnalysisCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * The data needed to create a MonthlyExpenseAnalysis.
     */
    data: XOR<MonthlyExpenseAnalysisCreateInput, MonthlyExpenseAnalysisUncheckedCreateInput>
  }

  /**
   * MonthlyExpenseAnalysis createMany
   */
  export type MonthlyExpenseAnalysisCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MonthlyExpenseAnalyses.
     */
    data: MonthlyExpenseAnalysisCreateManyInput | MonthlyExpenseAnalysisCreateManyInput[]
  }

  /**
   * MonthlyExpenseAnalysis createManyAndReturn
   */
  export type MonthlyExpenseAnalysisCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * The data used to create many MonthlyExpenseAnalyses.
     */
    data: MonthlyExpenseAnalysisCreateManyInput | MonthlyExpenseAnalysisCreateManyInput[]
  }

  /**
   * MonthlyExpenseAnalysis update
   */
  export type MonthlyExpenseAnalysisUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * The data needed to update a MonthlyExpenseAnalysis.
     */
    data: XOR<MonthlyExpenseAnalysisUpdateInput, MonthlyExpenseAnalysisUncheckedUpdateInput>
    /**
     * Choose, which MonthlyExpenseAnalysis to update.
     */
    where: MonthlyExpenseAnalysisWhereUniqueInput
  }

  /**
   * MonthlyExpenseAnalysis updateMany
   */
  export type MonthlyExpenseAnalysisUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MonthlyExpenseAnalyses.
     */
    data: XOR<MonthlyExpenseAnalysisUpdateManyMutationInput, MonthlyExpenseAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyExpenseAnalyses to update
     */
    where?: MonthlyExpenseAnalysisWhereInput
    /**
     * Limit how many MonthlyExpenseAnalyses to update.
     */
    limit?: number
  }

  /**
   * MonthlyExpenseAnalysis updateManyAndReturn
   */
  export type MonthlyExpenseAnalysisUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * The data used to update MonthlyExpenseAnalyses.
     */
    data: XOR<MonthlyExpenseAnalysisUpdateManyMutationInput, MonthlyExpenseAnalysisUncheckedUpdateManyInput>
    /**
     * Filter which MonthlyExpenseAnalyses to update
     */
    where?: MonthlyExpenseAnalysisWhereInput
    /**
     * Limit how many MonthlyExpenseAnalyses to update.
     */
    limit?: number
  }

  /**
   * MonthlyExpenseAnalysis upsert
   */
  export type MonthlyExpenseAnalysisUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * The filter to search for the MonthlyExpenseAnalysis to update in case it exists.
     */
    where: MonthlyExpenseAnalysisWhereUniqueInput
    /**
     * In case the MonthlyExpenseAnalysis found by the `where` argument doesn't exist, create a new MonthlyExpenseAnalysis with this data.
     */
    create: XOR<MonthlyExpenseAnalysisCreateInput, MonthlyExpenseAnalysisUncheckedCreateInput>
    /**
     * In case the MonthlyExpenseAnalysis was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MonthlyExpenseAnalysisUpdateInput, MonthlyExpenseAnalysisUncheckedUpdateInput>
  }

  /**
   * MonthlyExpenseAnalysis delete
   */
  export type MonthlyExpenseAnalysisDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
    /**
     * Filter which MonthlyExpenseAnalysis to delete.
     */
    where: MonthlyExpenseAnalysisWhereUniqueInput
  }

  /**
   * MonthlyExpenseAnalysis deleteMany
   */
  export type MonthlyExpenseAnalysisDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MonthlyExpenseAnalyses to delete
     */
    where?: MonthlyExpenseAnalysisWhereInput
    /**
     * Limit how many MonthlyExpenseAnalyses to delete.
     */
    limit?: number
  }

  /**
   * MonthlyExpenseAnalysis without action
   */
  export type MonthlyExpenseAnalysisDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MonthlyExpenseAnalysis
     */
    select?: MonthlyExpenseAnalysisSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MonthlyExpenseAnalysis
     */
    omit?: MonthlyExpenseAnalysisOmit<ExtArgs> | null
  }


  /**
   * Model ExpenseCategory
   */

  export type AggregateExpenseCategory = {
    _count: ExpenseCategoryCountAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  export type ExpenseCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExpenseCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExpenseCategoryCountAggregateOutputType = {
    id: number
    name: number
    color: number
    icon: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExpenseCategoryMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExpenseCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExpenseCategoryCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExpenseCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseCategory to aggregate.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExpenseCategories
    **/
    _count?: true | ExpenseCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseCategoryMaxAggregateInputType
  }

  export type GetExpenseCategoryAggregateType<T extends ExpenseCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenseCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenseCategory[P]>
      : GetScalarType<T[P], AggregateExpenseCategory[P]>
  }




  export type ExpenseCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseCategoryWhereInput
    orderBy?: ExpenseCategoryOrderByWithAggregationInput | ExpenseCategoryOrderByWithAggregationInput[]
    by: ExpenseCategoryScalarFieldEnum[] | ExpenseCategoryScalarFieldEnum
    having?: ExpenseCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCategoryCountAggregateInputType | true
    _min?: ExpenseCategoryMinAggregateInputType
    _max?: ExpenseCategoryMaxAggregateInputType
  }

  export type ExpenseCategoryGroupByOutputType = {
    id: string
    name: string
    color: string
    icon: string
    createdAt: Date
    updatedAt: Date
    _count: ExpenseCategoryCountAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  type GetExpenseCategoryGroupByPayload<T extends ExpenseCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExpenseCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color" | "icon" | "createdAt" | "updatedAt", ExtArgs["result"]["expenseCategory"]>

  export type $ExpenseCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExpenseCategory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      color: string
      icon: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["expenseCategory"]>
    composites: {}
  }

  type ExpenseCategoryGetPayload<S extends boolean | null | undefined | ExpenseCategoryDefaultArgs> = $Result.GetResult<Prisma.$ExpenseCategoryPayload, S>

  type ExpenseCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseCategoryCountAggregateInputType | true
    }

  export interface ExpenseCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExpenseCategory'], meta: { name: 'ExpenseCategory' } }
    /**
     * Find zero or one ExpenseCategory that matches the filter.
     * @param {ExpenseCategoryFindUniqueArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseCategoryFindUniqueArgs>(args: SelectSubset<T, ExpenseCategoryFindUniqueArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExpenseCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseCategoryFindUniqueOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseCategoryFindFirstArgs>(args?: SelectSubset<T, ExpenseCategoryFindFirstArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExpenseCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany()
     * 
     * // Get first 10 ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseCategoryFindManyArgs>(args?: SelectSubset<T, ExpenseCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExpenseCategory.
     * @param {ExpenseCategoryCreateArgs} args - Arguments to create a ExpenseCategory.
     * @example
     * // Create one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.create({
     *   data: {
     *     // ... data to create a ExpenseCategory
     *   }
     * })
     * 
     */
    create<T extends ExpenseCategoryCreateArgs>(args: SelectSubset<T, ExpenseCategoryCreateArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExpenseCategories.
     * @param {ExpenseCategoryCreateManyArgs} args - Arguments to create many ExpenseCategories.
     * @example
     * // Create many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCategoryCreateManyArgs>(args?: SelectSubset<T, ExpenseCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExpenseCategories and returns the data saved in the database.
     * @param {ExpenseCategoryCreateManyAndReturnArgs} args - Arguments to create many ExpenseCategories.
     * @example
     * // Create many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExpenseCategories and only return the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExpenseCategory.
     * @param {ExpenseCategoryDeleteArgs} args - Arguments to delete one ExpenseCategory.
     * @example
     * // Delete one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.delete({
     *   where: {
     *     // ... filter to delete one ExpenseCategory
     *   }
     * })
     * 
     */
    delete<T extends ExpenseCategoryDeleteArgs>(args: SelectSubset<T, ExpenseCategoryDeleteArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExpenseCategory.
     * @param {ExpenseCategoryUpdateArgs} args - Arguments to update one ExpenseCategory.
     * @example
     * // Update one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseCategoryUpdateArgs>(args: SelectSubset<T, ExpenseCategoryUpdateArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExpenseCategories.
     * @param {ExpenseCategoryDeleteManyArgs} args - Arguments to filter ExpenseCategories to delete.
     * @example
     * // Delete a few ExpenseCategories
     * const { count } = await prisma.expenseCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseCategoryDeleteManyArgs>(args?: SelectSubset<T, ExpenseCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseCategoryUpdateManyArgs>(args: SelectSubset<T, ExpenseCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseCategories and returns the data updated in the database.
     * @param {ExpenseCategoryUpdateManyAndReturnArgs} args - Arguments to update many ExpenseCategories.
     * @example
     * // Update many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExpenseCategories and only return the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExpenseCategory.
     * @param {ExpenseCategoryUpsertArgs} args - Arguments to update or create a ExpenseCategory.
     * @example
     * // Update or create a ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.upsert({
     *   create: {
     *     // ... data to create a ExpenseCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExpenseCategory we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseCategoryUpsertArgs>(args: SelectSubset<T, ExpenseCategoryUpsertArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryCountArgs} args - Arguments to filter ExpenseCategories to count.
     * @example
     * // Count the number of ExpenseCategories
     * const count = await prisma.expenseCategory.count({
     *   where: {
     *     // ... the filter for the ExpenseCategories we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCategoryCountArgs>(
      args?: Subset<T, ExpenseCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseCategoryAggregateArgs>(args: Subset<T, ExpenseCategoryAggregateArgs>): Prisma.PrismaPromise<GetExpenseCategoryAggregateType<T>>

    /**
     * Group by ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExpenseCategory model
   */
  readonly fields: ExpenseCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExpenseCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExpenseCategory model
   */
  interface ExpenseCategoryFieldRefs {
    readonly id: FieldRef<"ExpenseCategory", 'String'>
    readonly name: FieldRef<"ExpenseCategory", 'String'>
    readonly color: FieldRef<"ExpenseCategory", 'String'>
    readonly icon: FieldRef<"ExpenseCategory", 'String'>
    readonly createdAt: FieldRef<"ExpenseCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"ExpenseCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExpenseCategory findUnique
   */
  export type ExpenseCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory findUniqueOrThrow
   */
  export type ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory findFirst
   */
  export type ExpenseCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     */
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory findFirstOrThrow
   */
  export type ExpenseCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     */
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory findMany
   */
  export type ExpenseCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Filter, which ExpenseCategories to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory create
   */
  export type ExpenseCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * The data needed to create a ExpenseCategory.
     */
    data: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
  }

  /**
   * ExpenseCategory createMany
   */
  export type ExpenseCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExpenseCategories.
     */
    data: ExpenseCategoryCreateManyInput | ExpenseCategoryCreateManyInput[]
  }

  /**
   * ExpenseCategory createManyAndReturn
   */
  export type ExpenseCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many ExpenseCategories.
     */
    data: ExpenseCategoryCreateManyInput | ExpenseCategoryCreateManyInput[]
  }

  /**
   * ExpenseCategory update
   */
  export type ExpenseCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * The data needed to update a ExpenseCategory.
     */
    data: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
    /**
     * Choose, which ExpenseCategory to update.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory updateMany
   */
  export type ExpenseCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExpenseCategories.
     */
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseCategories to update
     */
    where?: ExpenseCategoryWhereInput
    /**
     * Limit how many ExpenseCategories to update.
     */
    limit?: number
  }

  /**
   * ExpenseCategory updateManyAndReturn
   */
  export type ExpenseCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * The data used to update ExpenseCategories.
     */
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseCategories to update
     */
    where?: ExpenseCategoryWhereInput
    /**
     * Limit how many ExpenseCategories to update.
     */
    limit?: number
  }

  /**
   * ExpenseCategory upsert
   */
  export type ExpenseCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * The filter to search for the ExpenseCategory to update in case it exists.
     */
    where: ExpenseCategoryWhereUniqueInput
    /**
     * In case the ExpenseCategory found by the `where` argument doesn't exist, create a new ExpenseCategory with this data.
     */
    create: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
    /**
     * In case the ExpenseCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
  }

  /**
   * ExpenseCategory delete
   */
  export type ExpenseCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Filter which ExpenseCategory to delete.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory deleteMany
   */
  export type ExpenseCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseCategories to delete
     */
    where?: ExpenseCategoryWhereInput
    /**
     * Limit how many ExpenseCategories to delete.
     */
    limit?: number
  }

  /**
   * ExpenseCategory without action
   */
  export type ExpenseCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
  }


  /**
   * Model IncomeCategory
   */

  export type AggregateIncomeCategory = {
    _count: IncomeCategoryCountAggregateOutputType | null
    _min: IncomeCategoryMinAggregateOutputType | null
    _max: IncomeCategoryMaxAggregateOutputType | null
  }

  export type IncomeCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IncomeCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IncomeCategoryCountAggregateOutputType = {
    id: number
    name: number
    color: number
    icon: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IncomeCategoryMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IncomeCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IncomeCategoryCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IncomeCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IncomeCategory to aggregate.
     */
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
     */
    orderBy?: IncomeCategoryOrderByWithRelationInput | IncomeCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IncomeCategories
    **/
    _count?: true | IncomeCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncomeCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncomeCategoryMaxAggregateInputType
  }

  export type GetIncomeCategoryAggregateType<T extends IncomeCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateIncomeCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIncomeCategory[P]>
      : GetScalarType<T[P], AggregateIncomeCategory[P]>
  }




  export type IncomeCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IncomeCategoryWhereInput
    orderBy?: IncomeCategoryOrderByWithAggregationInput | IncomeCategoryOrderByWithAggregationInput[]
    by: IncomeCategoryScalarFieldEnum[] | IncomeCategoryScalarFieldEnum
    having?: IncomeCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncomeCategoryCountAggregateInputType | true
    _min?: IncomeCategoryMinAggregateInputType
    _max?: IncomeCategoryMaxAggregateInputType
  }

  export type IncomeCategoryGroupByOutputType = {
    id: string
    name: string
    color: string
    icon: string
    createdAt: Date
    updatedAt: Date
    _count: IncomeCategoryCountAggregateOutputType | null
    _min: IncomeCategoryMinAggregateOutputType | null
    _max: IncomeCategoryMaxAggregateOutputType | null
  }

  type GetIncomeCategoryGroupByPayload<T extends IncomeCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IncomeCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IncomeCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IncomeCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], IncomeCategoryGroupByOutputType[P]>
        }
      >
    >


  export type IncomeCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["incomeCategory"]>

  export type IncomeCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["incomeCategory"]>

  export type IncomeCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["incomeCategory"]>

  export type IncomeCategorySelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IncomeCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color" | "icon" | "createdAt" | "updatedAt", ExtArgs["result"]["incomeCategory"]>

  export type $IncomeCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IncomeCategory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      color: string
      icon: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["incomeCategory"]>
    composites: {}
  }

  type IncomeCategoryGetPayload<S extends boolean | null | undefined | IncomeCategoryDefaultArgs> = $Result.GetResult<Prisma.$IncomeCategoryPayload, S>

  type IncomeCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IncomeCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IncomeCategoryCountAggregateInputType | true
    }

  export interface IncomeCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IncomeCategory'], meta: { name: 'IncomeCategory' } }
    /**
     * Find zero or one IncomeCategory that matches the filter.
     * @param {IncomeCategoryFindUniqueArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IncomeCategoryFindUniqueArgs>(args: SelectSubset<T, IncomeCategoryFindUniqueArgs<ExtArgs>>): Prisma__IncomeCategoryClient<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IncomeCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IncomeCategoryFindUniqueOrThrowArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IncomeCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, IncomeCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IncomeCategoryClient<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IncomeCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryFindFirstArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IncomeCategoryFindFirstArgs>(args?: SelectSubset<T, IncomeCategoryFindFirstArgs<ExtArgs>>): Prisma__IncomeCategoryClient<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IncomeCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryFindFirstOrThrowArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IncomeCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, IncomeCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__IncomeCategoryClient<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IncomeCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IncomeCategories
     * const incomeCategories = await prisma.incomeCategory.findMany()
     * 
     * // Get first 10 IncomeCategories
     * const incomeCategories = await prisma.incomeCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incomeCategoryWithIdOnly = await prisma.incomeCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IncomeCategoryFindManyArgs>(args?: SelectSubset<T, IncomeCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IncomeCategory.
     * @param {IncomeCategoryCreateArgs} args - Arguments to create a IncomeCategory.
     * @example
     * // Create one IncomeCategory
     * const IncomeCategory = await prisma.incomeCategory.create({
     *   data: {
     *     // ... data to create a IncomeCategory
     *   }
     * })
     * 
     */
    create<T extends IncomeCategoryCreateArgs>(args: SelectSubset<T, IncomeCategoryCreateArgs<ExtArgs>>): Prisma__IncomeCategoryClient<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IncomeCategories.
     * @param {IncomeCategoryCreateManyArgs} args - Arguments to create many IncomeCategories.
     * @example
     * // Create many IncomeCategories
     * const incomeCategory = await prisma.incomeCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IncomeCategoryCreateManyArgs>(args?: SelectSubset<T, IncomeCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IncomeCategories and returns the data saved in the database.
     * @param {IncomeCategoryCreateManyAndReturnArgs} args - Arguments to create many IncomeCategories.
     * @example
     * // Create many IncomeCategories
     * const incomeCategory = await prisma.incomeCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IncomeCategories and only return the `id`
     * const incomeCategoryWithIdOnly = await prisma.incomeCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IncomeCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, IncomeCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IncomeCategory.
     * @param {IncomeCategoryDeleteArgs} args - Arguments to delete one IncomeCategory.
     * @example
     * // Delete one IncomeCategory
     * const IncomeCategory = await prisma.incomeCategory.delete({
     *   where: {
     *     // ... filter to delete one IncomeCategory
     *   }
     * })
     * 
     */
    delete<T extends IncomeCategoryDeleteArgs>(args: SelectSubset<T, IncomeCategoryDeleteArgs<ExtArgs>>): Prisma__IncomeCategoryClient<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IncomeCategory.
     * @param {IncomeCategoryUpdateArgs} args - Arguments to update one IncomeCategory.
     * @example
     * // Update one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IncomeCategoryUpdateArgs>(args: SelectSubset<T, IncomeCategoryUpdateArgs<ExtArgs>>): Prisma__IncomeCategoryClient<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IncomeCategories.
     * @param {IncomeCategoryDeleteManyArgs} args - Arguments to filter IncomeCategories to delete.
     * @example
     * // Delete a few IncomeCategories
     * const { count } = await prisma.incomeCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IncomeCategoryDeleteManyArgs>(args?: SelectSubset<T, IncomeCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IncomeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IncomeCategories
     * const incomeCategory = await prisma.incomeCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IncomeCategoryUpdateManyArgs>(args: SelectSubset<T, IncomeCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IncomeCategories and returns the data updated in the database.
     * @param {IncomeCategoryUpdateManyAndReturnArgs} args - Arguments to update many IncomeCategories.
     * @example
     * // Update many IncomeCategories
     * const incomeCategory = await prisma.incomeCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IncomeCategories and only return the `id`
     * const incomeCategoryWithIdOnly = await prisma.incomeCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IncomeCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, IncomeCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IncomeCategory.
     * @param {IncomeCategoryUpsertArgs} args - Arguments to update or create a IncomeCategory.
     * @example
     * // Update or create a IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.upsert({
     *   create: {
     *     // ... data to create a IncomeCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IncomeCategory we want to update
     *   }
     * })
     */
    upsert<T extends IncomeCategoryUpsertArgs>(args: SelectSubset<T, IncomeCategoryUpsertArgs<ExtArgs>>): Prisma__IncomeCategoryClient<$Result.GetResult<Prisma.$IncomeCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IncomeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryCountArgs} args - Arguments to filter IncomeCategories to count.
     * @example
     * // Count the number of IncomeCategories
     * const count = await prisma.incomeCategory.count({
     *   where: {
     *     // ... the filter for the IncomeCategories we want to count
     *   }
     * })
    **/
    count<T extends IncomeCategoryCountArgs>(
      args?: Subset<T, IncomeCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IncomeCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IncomeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IncomeCategoryAggregateArgs>(args: Subset<T, IncomeCategoryAggregateArgs>): Prisma.PrismaPromise<GetIncomeCategoryAggregateType<T>>

    /**
     * Group by IncomeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IncomeCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IncomeCategoryGroupByArgs['orderBy'] }
        : { orderBy?: IncomeCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IncomeCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncomeCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IncomeCategory model
   */
  readonly fields: IncomeCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IncomeCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IncomeCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IncomeCategory model
   */
  interface IncomeCategoryFieldRefs {
    readonly id: FieldRef<"IncomeCategory", 'String'>
    readonly name: FieldRef<"IncomeCategory", 'String'>
    readonly color: FieldRef<"IncomeCategory", 'String'>
    readonly icon: FieldRef<"IncomeCategory", 'String'>
    readonly createdAt: FieldRef<"IncomeCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"IncomeCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IncomeCategory findUnique
   */
  export type IncomeCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * Filter, which IncomeCategory to fetch.
     */
    where: IncomeCategoryWhereUniqueInput
  }

  /**
   * IncomeCategory findUniqueOrThrow
   */
  export type IncomeCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * Filter, which IncomeCategory to fetch.
     */
    where: IncomeCategoryWhereUniqueInput
  }

  /**
   * IncomeCategory findFirst
   */
  export type IncomeCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * Filter, which IncomeCategory to fetch.
     */
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
     */
    orderBy?: IncomeCategoryOrderByWithRelationInput | IncomeCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IncomeCategories.
     */
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IncomeCategories.
     */
    distinct?: IncomeCategoryScalarFieldEnum | IncomeCategoryScalarFieldEnum[]
  }

  /**
   * IncomeCategory findFirstOrThrow
   */
  export type IncomeCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * Filter, which IncomeCategory to fetch.
     */
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
     */
    orderBy?: IncomeCategoryOrderByWithRelationInput | IncomeCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IncomeCategories.
     */
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IncomeCategories.
     */
    distinct?: IncomeCategoryScalarFieldEnum | IncomeCategoryScalarFieldEnum[]
  }

  /**
   * IncomeCategory findMany
   */
  export type IncomeCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * Filter, which IncomeCategories to fetch.
     */
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
     */
    orderBy?: IncomeCategoryOrderByWithRelationInput | IncomeCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IncomeCategories.
     */
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
     */
    skip?: number
    distinct?: IncomeCategoryScalarFieldEnum | IncomeCategoryScalarFieldEnum[]
  }

  /**
   * IncomeCategory create
   */
  export type IncomeCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * The data needed to create a IncomeCategory.
     */
    data: XOR<IncomeCategoryCreateInput, IncomeCategoryUncheckedCreateInput>
  }

  /**
   * IncomeCategory createMany
   */
  export type IncomeCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IncomeCategories.
     */
    data: IncomeCategoryCreateManyInput | IncomeCategoryCreateManyInput[]
  }

  /**
   * IncomeCategory createManyAndReturn
   */
  export type IncomeCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many IncomeCategories.
     */
    data: IncomeCategoryCreateManyInput | IncomeCategoryCreateManyInput[]
  }

  /**
   * IncomeCategory update
   */
  export type IncomeCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * The data needed to update a IncomeCategory.
     */
    data: XOR<IncomeCategoryUpdateInput, IncomeCategoryUncheckedUpdateInput>
    /**
     * Choose, which IncomeCategory to update.
     */
    where: IncomeCategoryWhereUniqueInput
  }

  /**
   * IncomeCategory updateMany
   */
  export type IncomeCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IncomeCategories.
     */
    data: XOR<IncomeCategoryUpdateManyMutationInput, IncomeCategoryUncheckedUpdateManyInput>
    /**
     * Filter which IncomeCategories to update
     */
    where?: IncomeCategoryWhereInput
    /**
     * Limit how many IncomeCategories to update.
     */
    limit?: number
  }

  /**
   * IncomeCategory updateManyAndReturn
   */
  export type IncomeCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * The data used to update IncomeCategories.
     */
    data: XOR<IncomeCategoryUpdateManyMutationInput, IncomeCategoryUncheckedUpdateManyInput>
    /**
     * Filter which IncomeCategories to update
     */
    where?: IncomeCategoryWhereInput
    /**
     * Limit how many IncomeCategories to update.
     */
    limit?: number
  }

  /**
   * IncomeCategory upsert
   */
  export type IncomeCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * The filter to search for the IncomeCategory to update in case it exists.
     */
    where: IncomeCategoryWhereUniqueInput
    /**
     * In case the IncomeCategory found by the `where` argument doesn't exist, create a new IncomeCategory with this data.
     */
    create: XOR<IncomeCategoryCreateInput, IncomeCategoryUncheckedCreateInput>
    /**
     * In case the IncomeCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IncomeCategoryUpdateInput, IncomeCategoryUncheckedUpdateInput>
  }

  /**
   * IncomeCategory delete
   */
  export type IncomeCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
    /**
     * Filter which IncomeCategory to delete.
     */
    where: IncomeCategoryWhereUniqueInput
  }

  /**
   * IncomeCategory deleteMany
   */
  export type IncomeCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IncomeCategories to delete
     */
    where?: IncomeCategoryWhereInput
    /**
     * Limit how many IncomeCategories to delete.
     */
    limit?: number
  }

  /**
   * IncomeCategory without action
   */
  export type IncomeCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     */
    select?: IncomeCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the IncomeCategory
     */
    omit?: IncomeCategoryOmit<ExtArgs> | null
  }


  /**
   * Model PaymentMethod
   */

  export type AggregatePaymentMethod = {
    _count: PaymentMethodCountAggregateOutputType | null
    _min: PaymentMethodMinAggregateOutputType | null
    _max: PaymentMethodMaxAggregateOutputType | null
  }

  export type PaymentMethodMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMethodMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    icon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMethodCountAggregateOutputType = {
    id: number
    name: number
    color: number
    icon: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentMethodMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMethodMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMethodCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    icon?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentMethodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentMethod to aggregate.
     */
    where?: PaymentMethodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentMethods to fetch.
     */
    orderBy?: PaymentMethodOrderByWithRelationInput | PaymentMethodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentMethodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentMethods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentMethods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentMethods
    **/
    _count?: true | PaymentMethodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMethodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMethodMaxAggregateInputType
  }

  export type GetPaymentMethodAggregateType<T extends PaymentMethodAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentMethod]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentMethod[P]>
      : GetScalarType<T[P], AggregatePaymentMethod[P]>
  }




  export type PaymentMethodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentMethodWhereInput
    orderBy?: PaymentMethodOrderByWithAggregationInput | PaymentMethodOrderByWithAggregationInput[]
    by: PaymentMethodScalarFieldEnum[] | PaymentMethodScalarFieldEnum
    having?: PaymentMethodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentMethodCountAggregateInputType | true
    _min?: PaymentMethodMinAggregateInputType
    _max?: PaymentMethodMaxAggregateInputType
  }

  export type PaymentMethodGroupByOutputType = {
    id: string
    name: string
    color: string
    icon: string
    createdAt: Date
    updatedAt: Date
    _count: PaymentMethodCountAggregateOutputType | null
    _min: PaymentMethodMinAggregateOutputType | null
    _max: PaymentMethodMaxAggregateOutputType | null
  }

  type GetPaymentMethodGroupByPayload<T extends PaymentMethodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentMethodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentMethodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentMethodGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentMethodGroupByOutputType[P]>
        }
      >
    >


  export type PaymentMethodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    importChannelPayments?: boolean | PaymentMethod$importChannelPaymentsArgs<ExtArgs>
    _count?: boolean | PaymentMethodCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentMethod"]>

  export type PaymentMethodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["paymentMethod"]>

  export type PaymentMethodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["paymentMethod"]>

  export type PaymentMethodSelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    icon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentMethodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color" | "icon" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentMethod"]>
  export type PaymentMethodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    importChannelPayments?: boolean | PaymentMethod$importChannelPaymentsArgs<ExtArgs>
    _count?: boolean | PaymentMethodCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentMethodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PaymentMethodIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PaymentMethodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentMethod"
    objects: {
      importChannelPayments: Prisma.$ImportChannelPaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      color: string
      icon: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentMethod"]>
    composites: {}
  }

  type PaymentMethodGetPayload<S extends boolean | null | undefined | PaymentMethodDefaultArgs> = $Result.GetResult<Prisma.$PaymentMethodPayload, S>

  type PaymentMethodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentMethodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentMethodCountAggregateInputType | true
    }

  export interface PaymentMethodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentMethod'], meta: { name: 'PaymentMethod' } }
    /**
     * Find zero or one PaymentMethod that matches the filter.
     * @param {PaymentMethodFindUniqueArgs} args - Arguments to find a PaymentMethod
     * @example
     * // Get one PaymentMethod
     * const paymentMethod = await prisma.paymentMethod.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentMethodFindUniqueArgs>(args: SelectSubset<T, PaymentMethodFindUniqueArgs<ExtArgs>>): Prisma__PaymentMethodClient<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentMethod that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentMethodFindUniqueOrThrowArgs} args - Arguments to find a PaymentMethod
     * @example
     * // Get one PaymentMethod
     * const paymentMethod = await prisma.paymentMethod.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentMethodFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentMethodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentMethodClient<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentMethod that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentMethodFindFirstArgs} args - Arguments to find a PaymentMethod
     * @example
     * // Get one PaymentMethod
     * const paymentMethod = await prisma.paymentMethod.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentMethodFindFirstArgs>(args?: SelectSubset<T, PaymentMethodFindFirstArgs<ExtArgs>>): Prisma__PaymentMethodClient<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentMethod that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentMethodFindFirstOrThrowArgs} args - Arguments to find a PaymentMethod
     * @example
     * // Get one PaymentMethod
     * const paymentMethod = await prisma.paymentMethod.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentMethodFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentMethodFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentMethodClient<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentMethods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentMethodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentMethods
     * const paymentMethods = await prisma.paymentMethod.findMany()
     * 
     * // Get first 10 PaymentMethods
     * const paymentMethods = await prisma.paymentMethod.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentMethodWithIdOnly = await prisma.paymentMethod.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentMethodFindManyArgs>(args?: SelectSubset<T, PaymentMethodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentMethod.
     * @param {PaymentMethodCreateArgs} args - Arguments to create a PaymentMethod.
     * @example
     * // Create one PaymentMethod
     * const PaymentMethod = await prisma.paymentMethod.create({
     *   data: {
     *     // ... data to create a PaymentMethod
     *   }
     * })
     * 
     */
    create<T extends PaymentMethodCreateArgs>(args: SelectSubset<T, PaymentMethodCreateArgs<ExtArgs>>): Prisma__PaymentMethodClient<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentMethods.
     * @param {PaymentMethodCreateManyArgs} args - Arguments to create many PaymentMethods.
     * @example
     * // Create many PaymentMethods
     * const paymentMethod = await prisma.paymentMethod.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentMethodCreateManyArgs>(args?: SelectSubset<T, PaymentMethodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentMethods and returns the data saved in the database.
     * @param {PaymentMethodCreateManyAndReturnArgs} args - Arguments to create many PaymentMethods.
     * @example
     * // Create many PaymentMethods
     * const paymentMethod = await prisma.paymentMethod.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentMethods and only return the `id`
     * const paymentMethodWithIdOnly = await prisma.paymentMethod.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentMethodCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentMethodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentMethod.
     * @param {PaymentMethodDeleteArgs} args - Arguments to delete one PaymentMethod.
     * @example
     * // Delete one PaymentMethod
     * const PaymentMethod = await prisma.paymentMethod.delete({
     *   where: {
     *     // ... filter to delete one PaymentMethod
     *   }
     * })
     * 
     */
    delete<T extends PaymentMethodDeleteArgs>(args: SelectSubset<T, PaymentMethodDeleteArgs<ExtArgs>>): Prisma__PaymentMethodClient<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentMethod.
     * @param {PaymentMethodUpdateArgs} args - Arguments to update one PaymentMethod.
     * @example
     * // Update one PaymentMethod
     * const paymentMethod = await prisma.paymentMethod.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentMethodUpdateArgs>(args: SelectSubset<T, PaymentMethodUpdateArgs<ExtArgs>>): Prisma__PaymentMethodClient<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentMethods.
     * @param {PaymentMethodDeleteManyArgs} args - Arguments to filter PaymentMethods to delete.
     * @example
     * // Delete a few PaymentMethods
     * const { count } = await prisma.paymentMethod.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentMethodDeleteManyArgs>(args?: SelectSubset<T, PaymentMethodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentMethods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentMethodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentMethods
     * const paymentMethod = await prisma.paymentMethod.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentMethodUpdateManyArgs>(args: SelectSubset<T, PaymentMethodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentMethods and returns the data updated in the database.
     * @param {PaymentMethodUpdateManyAndReturnArgs} args - Arguments to update many PaymentMethods.
     * @example
     * // Update many PaymentMethods
     * const paymentMethod = await prisma.paymentMethod.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentMethods and only return the `id`
     * const paymentMethodWithIdOnly = await prisma.paymentMethod.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentMethodUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentMethodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentMethod.
     * @param {PaymentMethodUpsertArgs} args - Arguments to update or create a PaymentMethod.
     * @example
     * // Update or create a PaymentMethod
     * const paymentMethod = await prisma.paymentMethod.upsert({
     *   create: {
     *     // ... data to create a PaymentMethod
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentMethod we want to update
     *   }
     * })
     */
    upsert<T extends PaymentMethodUpsertArgs>(args: SelectSubset<T, PaymentMethodUpsertArgs<ExtArgs>>): Prisma__PaymentMethodClient<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentMethods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentMethodCountArgs} args - Arguments to filter PaymentMethods to count.
     * @example
     * // Count the number of PaymentMethods
     * const count = await prisma.paymentMethod.count({
     *   where: {
     *     // ... the filter for the PaymentMethods we want to count
     *   }
     * })
    **/
    count<T extends PaymentMethodCountArgs>(
      args?: Subset<T, PaymentMethodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentMethodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentMethod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentMethodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentMethodAggregateArgs>(args: Subset<T, PaymentMethodAggregateArgs>): Prisma.PrismaPromise<GetPaymentMethodAggregateType<T>>

    /**
     * Group by PaymentMethod.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentMethodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentMethodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentMethodGroupByArgs['orderBy'] }
        : { orderBy?: PaymentMethodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentMethodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentMethodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentMethod model
   */
  readonly fields: PaymentMethodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentMethod.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentMethodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    importChannelPayments<T extends PaymentMethod$importChannelPaymentsArgs<ExtArgs> = {}>(args?: Subset<T, PaymentMethod$importChannelPaymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentMethod model
   */
  interface PaymentMethodFieldRefs {
    readonly id: FieldRef<"PaymentMethod", 'String'>
    readonly name: FieldRef<"PaymentMethod", 'String'>
    readonly color: FieldRef<"PaymentMethod", 'String'>
    readonly icon: FieldRef<"PaymentMethod", 'String'>
    readonly createdAt: FieldRef<"PaymentMethod", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentMethod", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentMethod findUnique
   */
  export type PaymentMethodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
    /**
     * Filter, which PaymentMethod to fetch.
     */
    where: PaymentMethodWhereUniqueInput
  }

  /**
   * PaymentMethod findUniqueOrThrow
   */
  export type PaymentMethodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
    /**
     * Filter, which PaymentMethod to fetch.
     */
    where: PaymentMethodWhereUniqueInput
  }

  /**
   * PaymentMethod findFirst
   */
  export type PaymentMethodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
    /**
     * Filter, which PaymentMethod to fetch.
     */
    where?: PaymentMethodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentMethods to fetch.
     */
    orderBy?: PaymentMethodOrderByWithRelationInput | PaymentMethodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentMethods.
     */
    cursor?: PaymentMethodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentMethods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentMethods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentMethods.
     */
    distinct?: PaymentMethodScalarFieldEnum | PaymentMethodScalarFieldEnum[]
  }

  /**
   * PaymentMethod findFirstOrThrow
   */
  export type PaymentMethodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
    /**
     * Filter, which PaymentMethod to fetch.
     */
    where?: PaymentMethodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentMethods to fetch.
     */
    orderBy?: PaymentMethodOrderByWithRelationInput | PaymentMethodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentMethods.
     */
    cursor?: PaymentMethodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentMethods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentMethods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentMethods.
     */
    distinct?: PaymentMethodScalarFieldEnum | PaymentMethodScalarFieldEnum[]
  }

  /**
   * PaymentMethod findMany
   */
  export type PaymentMethodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
    /**
     * Filter, which PaymentMethods to fetch.
     */
    where?: PaymentMethodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentMethods to fetch.
     */
    orderBy?: PaymentMethodOrderByWithRelationInput | PaymentMethodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentMethods.
     */
    cursor?: PaymentMethodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentMethods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentMethods.
     */
    skip?: number
    distinct?: PaymentMethodScalarFieldEnum | PaymentMethodScalarFieldEnum[]
  }

  /**
   * PaymentMethod create
   */
  export type PaymentMethodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentMethod.
     */
    data: XOR<PaymentMethodCreateInput, PaymentMethodUncheckedCreateInput>
  }

  /**
   * PaymentMethod createMany
   */
  export type PaymentMethodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentMethods.
     */
    data: PaymentMethodCreateManyInput | PaymentMethodCreateManyInput[]
  }

  /**
   * PaymentMethod createManyAndReturn
   */
  export type PaymentMethodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentMethods.
     */
    data: PaymentMethodCreateManyInput | PaymentMethodCreateManyInput[]
  }

  /**
   * PaymentMethod update
   */
  export type PaymentMethodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentMethod.
     */
    data: XOR<PaymentMethodUpdateInput, PaymentMethodUncheckedUpdateInput>
    /**
     * Choose, which PaymentMethod to update.
     */
    where: PaymentMethodWhereUniqueInput
  }

  /**
   * PaymentMethod updateMany
   */
  export type PaymentMethodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentMethods.
     */
    data: XOR<PaymentMethodUpdateManyMutationInput, PaymentMethodUncheckedUpdateManyInput>
    /**
     * Filter which PaymentMethods to update
     */
    where?: PaymentMethodWhereInput
    /**
     * Limit how many PaymentMethods to update.
     */
    limit?: number
  }

  /**
   * PaymentMethod updateManyAndReturn
   */
  export type PaymentMethodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * The data used to update PaymentMethods.
     */
    data: XOR<PaymentMethodUpdateManyMutationInput, PaymentMethodUncheckedUpdateManyInput>
    /**
     * Filter which PaymentMethods to update
     */
    where?: PaymentMethodWhereInput
    /**
     * Limit how many PaymentMethods to update.
     */
    limit?: number
  }

  /**
   * PaymentMethod upsert
   */
  export type PaymentMethodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentMethod to update in case it exists.
     */
    where: PaymentMethodWhereUniqueInput
    /**
     * In case the PaymentMethod found by the `where` argument doesn't exist, create a new PaymentMethod with this data.
     */
    create: XOR<PaymentMethodCreateInput, PaymentMethodUncheckedCreateInput>
    /**
     * In case the PaymentMethod was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentMethodUpdateInput, PaymentMethodUncheckedUpdateInput>
  }

  /**
   * PaymentMethod delete
   */
  export type PaymentMethodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
    /**
     * Filter which PaymentMethod to delete.
     */
    where: PaymentMethodWhereUniqueInput
  }

  /**
   * PaymentMethod deleteMany
   */
  export type PaymentMethodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentMethods to delete
     */
    where?: PaymentMethodWhereInput
    /**
     * Limit how many PaymentMethods to delete.
     */
    limit?: number
  }

  /**
   * PaymentMethod.importChannelPayments
   */
  export type PaymentMethod$importChannelPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    where?: ImportChannelPaymentWhereInput
    orderBy?: ImportChannelPaymentOrderByWithRelationInput | ImportChannelPaymentOrderByWithRelationInput[]
    cursor?: ImportChannelPaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ImportChannelPaymentScalarFieldEnum | ImportChannelPaymentScalarFieldEnum[]
  }

  /**
   * PaymentMethod without action
   */
  export type PaymentMethodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMethod
     */
    select?: PaymentMethodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMethod
     */
    omit?: PaymentMethodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentMethodInclude<ExtArgs> | null
  }


  /**
   * Model ImportChannelPayment
   */

  export type AggregateImportChannelPayment = {
    _count: ImportChannelPaymentCountAggregateOutputType | null
    _min: ImportChannelPaymentMinAggregateOutputType | null
    _max: ImportChannelPaymentMaxAggregateOutputType | null
  }

  export type ImportChannelPaymentMinAggregateOutputType = {
    channel: string | null
    paymentMethodId: string | null
  }

  export type ImportChannelPaymentMaxAggregateOutputType = {
    channel: string | null
    paymentMethodId: string | null
  }

  export type ImportChannelPaymentCountAggregateOutputType = {
    channel: number
    paymentMethodId: number
    _all: number
  }


  export type ImportChannelPaymentMinAggregateInputType = {
    channel?: true
    paymentMethodId?: true
  }

  export type ImportChannelPaymentMaxAggregateInputType = {
    channel?: true
    paymentMethodId?: true
  }

  export type ImportChannelPaymentCountAggregateInputType = {
    channel?: true
    paymentMethodId?: true
    _all?: true
  }

  export type ImportChannelPaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportChannelPayment to aggregate.
     */
    where?: ImportChannelPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportChannelPayments to fetch.
     */
    orderBy?: ImportChannelPaymentOrderByWithRelationInput | ImportChannelPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ImportChannelPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportChannelPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportChannelPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ImportChannelPayments
    **/
    _count?: true | ImportChannelPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ImportChannelPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ImportChannelPaymentMaxAggregateInputType
  }

  export type GetImportChannelPaymentAggregateType<T extends ImportChannelPaymentAggregateArgs> = {
        [P in keyof T & keyof AggregateImportChannelPayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateImportChannelPayment[P]>
      : GetScalarType<T[P], AggregateImportChannelPayment[P]>
  }




  export type ImportChannelPaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ImportChannelPaymentWhereInput
    orderBy?: ImportChannelPaymentOrderByWithAggregationInput | ImportChannelPaymentOrderByWithAggregationInput[]
    by: ImportChannelPaymentScalarFieldEnum[] | ImportChannelPaymentScalarFieldEnum
    having?: ImportChannelPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ImportChannelPaymentCountAggregateInputType | true
    _min?: ImportChannelPaymentMinAggregateInputType
    _max?: ImportChannelPaymentMaxAggregateInputType
  }

  export type ImportChannelPaymentGroupByOutputType = {
    channel: string
    paymentMethodId: string
    _count: ImportChannelPaymentCountAggregateOutputType | null
    _min: ImportChannelPaymentMinAggregateOutputType | null
    _max: ImportChannelPaymentMaxAggregateOutputType | null
  }

  type GetImportChannelPaymentGroupByPayload<T extends ImportChannelPaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ImportChannelPaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ImportChannelPaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ImportChannelPaymentGroupByOutputType[P]>
            : GetScalarType<T[P], ImportChannelPaymentGroupByOutputType[P]>
        }
      >
    >


  export type ImportChannelPaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    channel?: boolean
    paymentMethodId?: boolean
    paymentMethod?: boolean | PaymentMethodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importChannelPayment"]>

  export type ImportChannelPaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    channel?: boolean
    paymentMethodId?: boolean
    paymentMethod?: boolean | PaymentMethodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importChannelPayment"]>

  export type ImportChannelPaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    channel?: boolean
    paymentMethodId?: boolean
    paymentMethod?: boolean | PaymentMethodDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["importChannelPayment"]>

  export type ImportChannelPaymentSelectScalar = {
    channel?: boolean
    paymentMethodId?: boolean
  }

  export type ImportChannelPaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"channel" | "paymentMethodId", ExtArgs["result"]["importChannelPayment"]>
  export type ImportChannelPaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentMethod?: boolean | PaymentMethodDefaultArgs<ExtArgs>
  }
  export type ImportChannelPaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentMethod?: boolean | PaymentMethodDefaultArgs<ExtArgs>
  }
  export type ImportChannelPaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentMethod?: boolean | PaymentMethodDefaultArgs<ExtArgs>
  }

  export type $ImportChannelPaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ImportChannelPayment"
    objects: {
      paymentMethod: Prisma.$PaymentMethodPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      channel: string
      paymentMethodId: string
    }, ExtArgs["result"]["importChannelPayment"]>
    composites: {}
  }

  type ImportChannelPaymentGetPayload<S extends boolean | null | undefined | ImportChannelPaymentDefaultArgs> = $Result.GetResult<Prisma.$ImportChannelPaymentPayload, S>

  type ImportChannelPaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ImportChannelPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ImportChannelPaymentCountAggregateInputType | true
    }

  export interface ImportChannelPaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ImportChannelPayment'], meta: { name: 'ImportChannelPayment' } }
    /**
     * Find zero or one ImportChannelPayment that matches the filter.
     * @param {ImportChannelPaymentFindUniqueArgs} args - Arguments to find a ImportChannelPayment
     * @example
     * // Get one ImportChannelPayment
     * const importChannelPayment = await prisma.importChannelPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ImportChannelPaymentFindUniqueArgs>(args: SelectSubset<T, ImportChannelPaymentFindUniqueArgs<ExtArgs>>): Prisma__ImportChannelPaymentClient<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ImportChannelPayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ImportChannelPaymentFindUniqueOrThrowArgs} args - Arguments to find a ImportChannelPayment
     * @example
     * // Get one ImportChannelPayment
     * const importChannelPayment = await prisma.importChannelPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ImportChannelPaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, ImportChannelPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ImportChannelPaymentClient<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportChannelPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportChannelPaymentFindFirstArgs} args - Arguments to find a ImportChannelPayment
     * @example
     * // Get one ImportChannelPayment
     * const importChannelPayment = await prisma.importChannelPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ImportChannelPaymentFindFirstArgs>(args?: SelectSubset<T, ImportChannelPaymentFindFirstArgs<ExtArgs>>): Prisma__ImportChannelPaymentClient<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ImportChannelPayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportChannelPaymentFindFirstOrThrowArgs} args - Arguments to find a ImportChannelPayment
     * @example
     * // Get one ImportChannelPayment
     * const importChannelPayment = await prisma.importChannelPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ImportChannelPaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, ImportChannelPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ImportChannelPaymentClient<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ImportChannelPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportChannelPaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ImportChannelPayments
     * const importChannelPayments = await prisma.importChannelPayment.findMany()
     * 
     * // Get first 10 ImportChannelPayments
     * const importChannelPayments = await prisma.importChannelPayment.findMany({ take: 10 })
     * 
     * // Only select the `channel`
     * const importChannelPaymentWithChannelOnly = await prisma.importChannelPayment.findMany({ select: { channel: true } })
     * 
     */
    findMany<T extends ImportChannelPaymentFindManyArgs>(args?: SelectSubset<T, ImportChannelPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ImportChannelPayment.
     * @param {ImportChannelPaymentCreateArgs} args - Arguments to create a ImportChannelPayment.
     * @example
     * // Create one ImportChannelPayment
     * const ImportChannelPayment = await prisma.importChannelPayment.create({
     *   data: {
     *     // ... data to create a ImportChannelPayment
     *   }
     * })
     * 
     */
    create<T extends ImportChannelPaymentCreateArgs>(args: SelectSubset<T, ImportChannelPaymentCreateArgs<ExtArgs>>): Prisma__ImportChannelPaymentClient<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ImportChannelPayments.
     * @param {ImportChannelPaymentCreateManyArgs} args - Arguments to create many ImportChannelPayments.
     * @example
     * // Create many ImportChannelPayments
     * const importChannelPayment = await prisma.importChannelPayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ImportChannelPaymentCreateManyArgs>(args?: SelectSubset<T, ImportChannelPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ImportChannelPayments and returns the data saved in the database.
     * @param {ImportChannelPaymentCreateManyAndReturnArgs} args - Arguments to create many ImportChannelPayments.
     * @example
     * // Create many ImportChannelPayments
     * const importChannelPayment = await prisma.importChannelPayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ImportChannelPayments and only return the `channel`
     * const importChannelPaymentWithChannelOnly = await prisma.importChannelPayment.createManyAndReturn({
     *   select: { channel: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ImportChannelPaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, ImportChannelPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ImportChannelPayment.
     * @param {ImportChannelPaymentDeleteArgs} args - Arguments to delete one ImportChannelPayment.
     * @example
     * // Delete one ImportChannelPayment
     * const ImportChannelPayment = await prisma.importChannelPayment.delete({
     *   where: {
     *     // ... filter to delete one ImportChannelPayment
     *   }
     * })
     * 
     */
    delete<T extends ImportChannelPaymentDeleteArgs>(args: SelectSubset<T, ImportChannelPaymentDeleteArgs<ExtArgs>>): Prisma__ImportChannelPaymentClient<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ImportChannelPayment.
     * @param {ImportChannelPaymentUpdateArgs} args - Arguments to update one ImportChannelPayment.
     * @example
     * // Update one ImportChannelPayment
     * const importChannelPayment = await prisma.importChannelPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ImportChannelPaymentUpdateArgs>(args: SelectSubset<T, ImportChannelPaymentUpdateArgs<ExtArgs>>): Prisma__ImportChannelPaymentClient<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ImportChannelPayments.
     * @param {ImportChannelPaymentDeleteManyArgs} args - Arguments to filter ImportChannelPayments to delete.
     * @example
     * // Delete a few ImportChannelPayments
     * const { count } = await prisma.importChannelPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ImportChannelPaymentDeleteManyArgs>(args?: SelectSubset<T, ImportChannelPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportChannelPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportChannelPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ImportChannelPayments
     * const importChannelPayment = await prisma.importChannelPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ImportChannelPaymentUpdateManyArgs>(args: SelectSubset<T, ImportChannelPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ImportChannelPayments and returns the data updated in the database.
     * @param {ImportChannelPaymentUpdateManyAndReturnArgs} args - Arguments to update many ImportChannelPayments.
     * @example
     * // Update many ImportChannelPayments
     * const importChannelPayment = await prisma.importChannelPayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ImportChannelPayments and only return the `channel`
     * const importChannelPaymentWithChannelOnly = await prisma.importChannelPayment.updateManyAndReturn({
     *   select: { channel: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ImportChannelPaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, ImportChannelPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ImportChannelPayment.
     * @param {ImportChannelPaymentUpsertArgs} args - Arguments to update or create a ImportChannelPayment.
     * @example
     * // Update or create a ImportChannelPayment
     * const importChannelPayment = await prisma.importChannelPayment.upsert({
     *   create: {
     *     // ... data to create a ImportChannelPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ImportChannelPayment we want to update
     *   }
     * })
     */
    upsert<T extends ImportChannelPaymentUpsertArgs>(args: SelectSubset<T, ImportChannelPaymentUpsertArgs<ExtArgs>>): Prisma__ImportChannelPaymentClient<$Result.GetResult<Prisma.$ImportChannelPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ImportChannelPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportChannelPaymentCountArgs} args - Arguments to filter ImportChannelPayments to count.
     * @example
     * // Count the number of ImportChannelPayments
     * const count = await prisma.importChannelPayment.count({
     *   where: {
     *     // ... the filter for the ImportChannelPayments we want to count
     *   }
     * })
    **/
    count<T extends ImportChannelPaymentCountArgs>(
      args?: Subset<T, ImportChannelPaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ImportChannelPaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ImportChannelPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportChannelPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ImportChannelPaymentAggregateArgs>(args: Subset<T, ImportChannelPaymentAggregateArgs>): Prisma.PrismaPromise<GetImportChannelPaymentAggregateType<T>>

    /**
     * Group by ImportChannelPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ImportChannelPaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ImportChannelPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ImportChannelPaymentGroupByArgs['orderBy'] }
        : { orderBy?: ImportChannelPaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ImportChannelPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImportChannelPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ImportChannelPayment model
   */
  readonly fields: ImportChannelPaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ImportChannelPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ImportChannelPaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paymentMethod<T extends PaymentMethodDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentMethodDefaultArgs<ExtArgs>>): Prisma__PaymentMethodClient<$Result.GetResult<Prisma.$PaymentMethodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ImportChannelPayment model
   */
  interface ImportChannelPaymentFieldRefs {
    readonly channel: FieldRef<"ImportChannelPayment", 'String'>
    readonly paymentMethodId: FieldRef<"ImportChannelPayment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ImportChannelPayment findUnique
   */
  export type ImportChannelPaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ImportChannelPayment to fetch.
     */
    where: ImportChannelPaymentWhereUniqueInput
  }

  /**
   * ImportChannelPayment findUniqueOrThrow
   */
  export type ImportChannelPaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ImportChannelPayment to fetch.
     */
    where: ImportChannelPaymentWhereUniqueInput
  }

  /**
   * ImportChannelPayment findFirst
   */
  export type ImportChannelPaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ImportChannelPayment to fetch.
     */
    where?: ImportChannelPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportChannelPayments to fetch.
     */
    orderBy?: ImportChannelPaymentOrderByWithRelationInput | ImportChannelPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportChannelPayments.
     */
    cursor?: ImportChannelPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportChannelPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportChannelPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportChannelPayments.
     */
    distinct?: ImportChannelPaymentScalarFieldEnum | ImportChannelPaymentScalarFieldEnum[]
  }

  /**
   * ImportChannelPayment findFirstOrThrow
   */
  export type ImportChannelPaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ImportChannelPayment to fetch.
     */
    where?: ImportChannelPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportChannelPayments to fetch.
     */
    orderBy?: ImportChannelPaymentOrderByWithRelationInput | ImportChannelPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ImportChannelPayments.
     */
    cursor?: ImportChannelPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportChannelPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportChannelPayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ImportChannelPayments.
     */
    distinct?: ImportChannelPaymentScalarFieldEnum | ImportChannelPaymentScalarFieldEnum[]
  }

  /**
   * ImportChannelPayment findMany
   */
  export type ImportChannelPaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    /**
     * Filter, which ImportChannelPayments to fetch.
     */
    where?: ImportChannelPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ImportChannelPayments to fetch.
     */
    orderBy?: ImportChannelPaymentOrderByWithRelationInput | ImportChannelPaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ImportChannelPayments.
     */
    cursor?: ImportChannelPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ImportChannelPayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ImportChannelPayments.
     */
    skip?: number
    distinct?: ImportChannelPaymentScalarFieldEnum | ImportChannelPaymentScalarFieldEnum[]
  }

  /**
   * ImportChannelPayment create
   */
  export type ImportChannelPaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a ImportChannelPayment.
     */
    data: XOR<ImportChannelPaymentCreateInput, ImportChannelPaymentUncheckedCreateInput>
  }

  /**
   * ImportChannelPayment createMany
   */
  export type ImportChannelPaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ImportChannelPayments.
     */
    data: ImportChannelPaymentCreateManyInput | ImportChannelPaymentCreateManyInput[]
  }

  /**
   * ImportChannelPayment createManyAndReturn
   */
  export type ImportChannelPaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * The data used to create many ImportChannelPayments.
     */
    data: ImportChannelPaymentCreateManyInput | ImportChannelPaymentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImportChannelPayment update
   */
  export type ImportChannelPaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a ImportChannelPayment.
     */
    data: XOR<ImportChannelPaymentUpdateInput, ImportChannelPaymentUncheckedUpdateInput>
    /**
     * Choose, which ImportChannelPayment to update.
     */
    where: ImportChannelPaymentWhereUniqueInput
  }

  /**
   * ImportChannelPayment updateMany
   */
  export type ImportChannelPaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ImportChannelPayments.
     */
    data: XOR<ImportChannelPaymentUpdateManyMutationInput, ImportChannelPaymentUncheckedUpdateManyInput>
    /**
     * Filter which ImportChannelPayments to update
     */
    where?: ImportChannelPaymentWhereInput
    /**
     * Limit how many ImportChannelPayments to update.
     */
    limit?: number
  }

  /**
   * ImportChannelPayment updateManyAndReturn
   */
  export type ImportChannelPaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * The data used to update ImportChannelPayments.
     */
    data: XOR<ImportChannelPaymentUpdateManyMutationInput, ImportChannelPaymentUncheckedUpdateManyInput>
    /**
     * Filter which ImportChannelPayments to update
     */
    where?: ImportChannelPaymentWhereInput
    /**
     * Limit how many ImportChannelPayments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ImportChannelPayment upsert
   */
  export type ImportChannelPaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the ImportChannelPayment to update in case it exists.
     */
    where: ImportChannelPaymentWhereUniqueInput
    /**
     * In case the ImportChannelPayment found by the `where` argument doesn't exist, create a new ImportChannelPayment with this data.
     */
    create: XOR<ImportChannelPaymentCreateInput, ImportChannelPaymentUncheckedCreateInput>
    /**
     * In case the ImportChannelPayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ImportChannelPaymentUpdateInput, ImportChannelPaymentUncheckedUpdateInput>
  }

  /**
   * ImportChannelPayment delete
   */
  export type ImportChannelPaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
    /**
     * Filter which ImportChannelPayment to delete.
     */
    where: ImportChannelPaymentWhereUniqueInput
  }

  /**
   * ImportChannelPayment deleteMany
   */
  export type ImportChannelPaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ImportChannelPayments to delete
     */
    where?: ImportChannelPaymentWhereInput
    /**
     * Limit how many ImportChannelPayments to delete.
     */
    limit?: number
  }

  /**
   * ImportChannelPayment without action
   */
  export type ImportChannelPaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ImportChannelPayment
     */
    select?: ImportChannelPaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ImportChannelPayment
     */
    omit?: ImportChannelPaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ImportChannelPaymentInclude<ExtArgs> | null
  }


  /**
   * Model AiPrompt
   */

  export type AggregateAiPrompt = {
    _count: AiPromptCountAggregateOutputType | null
    _min: AiPromptMinAggregateOutputType | null
    _max: AiPromptMaxAggregateOutputType | null
  }

  export type AiPromptMinAggregateOutputType = {
    id: string | null
    key: string | null
    content: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type AiPromptMaxAggregateOutputType = {
    id: string | null
    key: string | null
    content: string | null
    updatedAt: Date | null
    createdAt: Date | null
  }

  export type AiPromptCountAggregateOutputType = {
    id: number
    key: number
    content: number
    updatedAt: number
    createdAt: number
    _all: number
  }


  export type AiPromptMinAggregateInputType = {
    id?: true
    key?: true
    content?: true
    updatedAt?: true
    createdAt?: true
  }

  export type AiPromptMaxAggregateInputType = {
    id?: true
    key?: true
    content?: true
    updatedAt?: true
    createdAt?: true
  }

  export type AiPromptCountAggregateInputType = {
    id?: true
    key?: true
    content?: true
    updatedAt?: true
    createdAt?: true
    _all?: true
  }

  export type AiPromptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiPrompt to aggregate.
     */
    where?: AiPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiPrompts to fetch.
     */
    orderBy?: AiPromptOrderByWithRelationInput | AiPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiPrompts
    **/
    _count?: true | AiPromptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiPromptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiPromptMaxAggregateInputType
  }

  export type GetAiPromptAggregateType<T extends AiPromptAggregateArgs> = {
        [P in keyof T & keyof AggregateAiPrompt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiPrompt[P]>
      : GetScalarType<T[P], AggregateAiPrompt[P]>
  }




  export type AiPromptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiPromptWhereInput
    orderBy?: AiPromptOrderByWithAggregationInput | AiPromptOrderByWithAggregationInput[]
    by: AiPromptScalarFieldEnum[] | AiPromptScalarFieldEnum
    having?: AiPromptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiPromptCountAggregateInputType | true
    _min?: AiPromptMinAggregateInputType
    _max?: AiPromptMaxAggregateInputType
  }

  export type AiPromptGroupByOutputType = {
    id: string
    key: string
    content: string
    updatedAt: Date
    createdAt: Date
    _count: AiPromptCountAggregateOutputType | null
    _min: AiPromptMinAggregateOutputType | null
    _max: AiPromptMaxAggregateOutputType | null
  }

  type GetAiPromptGroupByPayload<T extends AiPromptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiPromptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiPromptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiPromptGroupByOutputType[P]>
            : GetScalarType<T[P], AiPromptGroupByOutputType[P]>
        }
      >
    >


  export type AiPromptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    content?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiPrompt"]>

  export type AiPromptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    content?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiPrompt"]>

  export type AiPromptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    content?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiPrompt"]>

  export type AiPromptSelectScalar = {
    id?: boolean
    key?: boolean
    content?: boolean
    updatedAt?: boolean
    createdAt?: boolean
  }

  export type AiPromptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "content" | "updatedAt" | "createdAt", ExtArgs["result"]["aiPrompt"]>

  export type $AiPromptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiPrompt"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      content: string
      updatedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["aiPrompt"]>
    composites: {}
  }

  type AiPromptGetPayload<S extends boolean | null | undefined | AiPromptDefaultArgs> = $Result.GetResult<Prisma.$AiPromptPayload, S>

  type AiPromptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiPromptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiPromptCountAggregateInputType | true
    }

  export interface AiPromptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiPrompt'], meta: { name: 'AiPrompt' } }
    /**
     * Find zero or one AiPrompt that matches the filter.
     * @param {AiPromptFindUniqueArgs} args - Arguments to find a AiPrompt
     * @example
     * // Get one AiPrompt
     * const aiPrompt = await prisma.aiPrompt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiPromptFindUniqueArgs>(args: SelectSubset<T, AiPromptFindUniqueArgs<ExtArgs>>): Prisma__AiPromptClient<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiPrompt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiPromptFindUniqueOrThrowArgs} args - Arguments to find a AiPrompt
     * @example
     * // Get one AiPrompt
     * const aiPrompt = await prisma.aiPrompt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiPromptFindUniqueOrThrowArgs>(args: SelectSubset<T, AiPromptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiPromptClient<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiPrompt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptFindFirstArgs} args - Arguments to find a AiPrompt
     * @example
     * // Get one AiPrompt
     * const aiPrompt = await prisma.aiPrompt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiPromptFindFirstArgs>(args?: SelectSubset<T, AiPromptFindFirstArgs<ExtArgs>>): Prisma__AiPromptClient<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiPrompt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptFindFirstOrThrowArgs} args - Arguments to find a AiPrompt
     * @example
     * // Get one AiPrompt
     * const aiPrompt = await prisma.aiPrompt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiPromptFindFirstOrThrowArgs>(args?: SelectSubset<T, AiPromptFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiPromptClient<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiPrompts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiPrompts
     * const aiPrompts = await prisma.aiPrompt.findMany()
     * 
     * // Get first 10 AiPrompts
     * const aiPrompts = await prisma.aiPrompt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiPromptWithIdOnly = await prisma.aiPrompt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiPromptFindManyArgs>(args?: SelectSubset<T, AiPromptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiPrompt.
     * @param {AiPromptCreateArgs} args - Arguments to create a AiPrompt.
     * @example
     * // Create one AiPrompt
     * const AiPrompt = await prisma.aiPrompt.create({
     *   data: {
     *     // ... data to create a AiPrompt
     *   }
     * })
     * 
     */
    create<T extends AiPromptCreateArgs>(args: SelectSubset<T, AiPromptCreateArgs<ExtArgs>>): Prisma__AiPromptClient<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiPrompts.
     * @param {AiPromptCreateManyArgs} args - Arguments to create many AiPrompts.
     * @example
     * // Create many AiPrompts
     * const aiPrompt = await prisma.aiPrompt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiPromptCreateManyArgs>(args?: SelectSubset<T, AiPromptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiPrompts and returns the data saved in the database.
     * @param {AiPromptCreateManyAndReturnArgs} args - Arguments to create many AiPrompts.
     * @example
     * // Create many AiPrompts
     * const aiPrompt = await prisma.aiPrompt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiPrompts and only return the `id`
     * const aiPromptWithIdOnly = await prisma.aiPrompt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiPromptCreateManyAndReturnArgs>(args?: SelectSubset<T, AiPromptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiPrompt.
     * @param {AiPromptDeleteArgs} args - Arguments to delete one AiPrompt.
     * @example
     * // Delete one AiPrompt
     * const AiPrompt = await prisma.aiPrompt.delete({
     *   where: {
     *     // ... filter to delete one AiPrompt
     *   }
     * })
     * 
     */
    delete<T extends AiPromptDeleteArgs>(args: SelectSubset<T, AiPromptDeleteArgs<ExtArgs>>): Prisma__AiPromptClient<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiPrompt.
     * @param {AiPromptUpdateArgs} args - Arguments to update one AiPrompt.
     * @example
     * // Update one AiPrompt
     * const aiPrompt = await prisma.aiPrompt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiPromptUpdateArgs>(args: SelectSubset<T, AiPromptUpdateArgs<ExtArgs>>): Prisma__AiPromptClient<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiPrompts.
     * @param {AiPromptDeleteManyArgs} args - Arguments to filter AiPrompts to delete.
     * @example
     * // Delete a few AiPrompts
     * const { count } = await prisma.aiPrompt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiPromptDeleteManyArgs>(args?: SelectSubset<T, AiPromptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiPrompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiPrompts
     * const aiPrompt = await prisma.aiPrompt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiPromptUpdateManyArgs>(args: SelectSubset<T, AiPromptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiPrompts and returns the data updated in the database.
     * @param {AiPromptUpdateManyAndReturnArgs} args - Arguments to update many AiPrompts.
     * @example
     * // Update many AiPrompts
     * const aiPrompt = await prisma.aiPrompt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiPrompts and only return the `id`
     * const aiPromptWithIdOnly = await prisma.aiPrompt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AiPromptUpdateManyAndReturnArgs>(args: SelectSubset<T, AiPromptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiPrompt.
     * @param {AiPromptUpsertArgs} args - Arguments to update or create a AiPrompt.
     * @example
     * // Update or create a AiPrompt
     * const aiPrompt = await prisma.aiPrompt.upsert({
     *   create: {
     *     // ... data to create a AiPrompt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiPrompt we want to update
     *   }
     * })
     */
    upsert<T extends AiPromptUpsertArgs>(args: SelectSubset<T, AiPromptUpsertArgs<ExtArgs>>): Prisma__AiPromptClient<$Result.GetResult<Prisma.$AiPromptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiPrompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptCountArgs} args - Arguments to filter AiPrompts to count.
     * @example
     * // Count the number of AiPrompts
     * const count = await prisma.aiPrompt.count({
     *   where: {
     *     // ... the filter for the AiPrompts we want to count
     *   }
     * })
    **/
    count<T extends AiPromptCountArgs>(
      args?: Subset<T, AiPromptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiPromptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiPrompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiPromptAggregateArgs>(args: Subset<T, AiPromptAggregateArgs>): Prisma.PrismaPromise<GetAiPromptAggregateType<T>>

    /**
     * Group by AiPrompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiPromptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiPromptGroupByArgs['orderBy'] }
        : { orderBy?: AiPromptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiPromptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiPromptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiPrompt model
   */
  readonly fields: AiPromptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiPrompt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiPromptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiPrompt model
   */
  interface AiPromptFieldRefs {
    readonly id: FieldRef<"AiPrompt", 'String'>
    readonly key: FieldRef<"AiPrompt", 'String'>
    readonly content: FieldRef<"AiPrompt", 'String'>
    readonly updatedAt: FieldRef<"AiPrompt", 'DateTime'>
    readonly createdAt: FieldRef<"AiPrompt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiPrompt findUnique
   */
  export type AiPromptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * Filter, which AiPrompt to fetch.
     */
    where: AiPromptWhereUniqueInput
  }

  /**
   * AiPrompt findUniqueOrThrow
   */
  export type AiPromptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * Filter, which AiPrompt to fetch.
     */
    where: AiPromptWhereUniqueInput
  }

  /**
   * AiPrompt findFirst
   */
  export type AiPromptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * Filter, which AiPrompt to fetch.
     */
    where?: AiPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiPrompts to fetch.
     */
    orderBy?: AiPromptOrderByWithRelationInput | AiPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiPrompts.
     */
    cursor?: AiPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiPrompts.
     */
    distinct?: AiPromptScalarFieldEnum | AiPromptScalarFieldEnum[]
  }

  /**
   * AiPrompt findFirstOrThrow
   */
  export type AiPromptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * Filter, which AiPrompt to fetch.
     */
    where?: AiPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiPrompts to fetch.
     */
    orderBy?: AiPromptOrderByWithRelationInput | AiPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiPrompts.
     */
    cursor?: AiPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiPrompts.
     */
    distinct?: AiPromptScalarFieldEnum | AiPromptScalarFieldEnum[]
  }

  /**
   * AiPrompt findMany
   */
  export type AiPromptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * Filter, which AiPrompts to fetch.
     */
    where?: AiPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiPrompts to fetch.
     */
    orderBy?: AiPromptOrderByWithRelationInput | AiPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiPrompts.
     */
    cursor?: AiPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiPrompts.
     */
    skip?: number
    distinct?: AiPromptScalarFieldEnum | AiPromptScalarFieldEnum[]
  }

  /**
   * AiPrompt create
   */
  export type AiPromptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * The data needed to create a AiPrompt.
     */
    data: XOR<AiPromptCreateInput, AiPromptUncheckedCreateInput>
  }

  /**
   * AiPrompt createMany
   */
  export type AiPromptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiPrompts.
     */
    data: AiPromptCreateManyInput | AiPromptCreateManyInput[]
  }

  /**
   * AiPrompt createManyAndReturn
   */
  export type AiPromptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * The data used to create many AiPrompts.
     */
    data: AiPromptCreateManyInput | AiPromptCreateManyInput[]
  }

  /**
   * AiPrompt update
   */
  export type AiPromptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * The data needed to update a AiPrompt.
     */
    data: XOR<AiPromptUpdateInput, AiPromptUncheckedUpdateInput>
    /**
     * Choose, which AiPrompt to update.
     */
    where: AiPromptWhereUniqueInput
  }

  /**
   * AiPrompt updateMany
   */
  export type AiPromptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiPrompts.
     */
    data: XOR<AiPromptUpdateManyMutationInput, AiPromptUncheckedUpdateManyInput>
    /**
     * Filter which AiPrompts to update
     */
    where?: AiPromptWhereInput
    /**
     * Limit how many AiPrompts to update.
     */
    limit?: number
  }

  /**
   * AiPrompt updateManyAndReturn
   */
  export type AiPromptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * The data used to update AiPrompts.
     */
    data: XOR<AiPromptUpdateManyMutationInput, AiPromptUncheckedUpdateManyInput>
    /**
     * Filter which AiPrompts to update
     */
    where?: AiPromptWhereInput
    /**
     * Limit how many AiPrompts to update.
     */
    limit?: number
  }

  /**
   * AiPrompt upsert
   */
  export type AiPromptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * The filter to search for the AiPrompt to update in case it exists.
     */
    where: AiPromptWhereUniqueInput
    /**
     * In case the AiPrompt found by the `where` argument doesn't exist, create a new AiPrompt with this data.
     */
    create: XOR<AiPromptCreateInput, AiPromptUncheckedCreateInput>
    /**
     * In case the AiPrompt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiPromptUpdateInput, AiPromptUncheckedUpdateInput>
  }

  /**
   * AiPrompt delete
   */
  export type AiPromptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
    /**
     * Filter which AiPrompt to delete.
     */
    where: AiPromptWhereUniqueInput
  }

  /**
   * AiPrompt deleteMany
   */
  export type AiPromptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiPrompts to delete
     */
    where?: AiPromptWhereInput
    /**
     * Limit how many AiPrompts to delete.
     */
    limit?: number
  }

  /**
   * AiPrompt without action
   */
  export type AiPromptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPrompt
     */
    select?: AiPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPrompt
     */
    omit?: AiPromptOmit<ExtArgs> | null
  }


  /**
   * Model AiPromptVersion
   */

  export type AggregateAiPromptVersion = {
    _count: AiPromptVersionCountAggregateOutputType | null
    _min: AiPromptVersionMinAggregateOutputType | null
    _max: AiPromptVersionMaxAggregateOutputType | null
  }

  export type AiPromptVersionMinAggregateOutputType = {
    id: string | null
    promptKey: string | null
    content: string | null
    createdAt: Date | null
  }

  export type AiPromptVersionMaxAggregateOutputType = {
    id: string | null
    promptKey: string | null
    content: string | null
    createdAt: Date | null
  }

  export type AiPromptVersionCountAggregateOutputType = {
    id: number
    promptKey: number
    content: number
    createdAt: number
    _all: number
  }


  export type AiPromptVersionMinAggregateInputType = {
    id?: true
    promptKey?: true
    content?: true
    createdAt?: true
  }

  export type AiPromptVersionMaxAggregateInputType = {
    id?: true
    promptKey?: true
    content?: true
    createdAt?: true
  }

  export type AiPromptVersionCountAggregateInputType = {
    id?: true
    promptKey?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type AiPromptVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiPromptVersion to aggregate.
     */
    where?: AiPromptVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiPromptVersions to fetch.
     */
    orderBy?: AiPromptVersionOrderByWithRelationInput | AiPromptVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiPromptVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiPromptVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiPromptVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiPromptVersions
    **/
    _count?: true | AiPromptVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiPromptVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiPromptVersionMaxAggregateInputType
  }

  export type GetAiPromptVersionAggregateType<T extends AiPromptVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateAiPromptVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiPromptVersion[P]>
      : GetScalarType<T[P], AggregateAiPromptVersion[P]>
  }




  export type AiPromptVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiPromptVersionWhereInput
    orderBy?: AiPromptVersionOrderByWithAggregationInput | AiPromptVersionOrderByWithAggregationInput[]
    by: AiPromptVersionScalarFieldEnum[] | AiPromptVersionScalarFieldEnum
    having?: AiPromptVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiPromptVersionCountAggregateInputType | true
    _min?: AiPromptVersionMinAggregateInputType
    _max?: AiPromptVersionMaxAggregateInputType
  }

  export type AiPromptVersionGroupByOutputType = {
    id: string
    promptKey: string
    content: string
    createdAt: Date
    _count: AiPromptVersionCountAggregateOutputType | null
    _min: AiPromptVersionMinAggregateOutputType | null
    _max: AiPromptVersionMaxAggregateOutputType | null
  }

  type GetAiPromptVersionGroupByPayload<T extends AiPromptVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiPromptVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiPromptVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiPromptVersionGroupByOutputType[P]>
            : GetScalarType<T[P], AiPromptVersionGroupByOutputType[P]>
        }
      >
    >


  export type AiPromptVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promptKey?: boolean
    content?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiPromptVersion"]>

  export type AiPromptVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promptKey?: boolean
    content?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiPromptVersion"]>

  export type AiPromptVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    promptKey?: boolean
    content?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aiPromptVersion"]>

  export type AiPromptVersionSelectScalar = {
    id?: boolean
    promptKey?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type AiPromptVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "promptKey" | "content" | "createdAt", ExtArgs["result"]["aiPromptVersion"]>

  export type $AiPromptVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiPromptVersion"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      promptKey: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["aiPromptVersion"]>
    composites: {}
  }

  type AiPromptVersionGetPayload<S extends boolean | null | undefined | AiPromptVersionDefaultArgs> = $Result.GetResult<Prisma.$AiPromptVersionPayload, S>

  type AiPromptVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiPromptVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiPromptVersionCountAggregateInputType | true
    }

  export interface AiPromptVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiPromptVersion'], meta: { name: 'AiPromptVersion' } }
    /**
     * Find zero or one AiPromptVersion that matches the filter.
     * @param {AiPromptVersionFindUniqueArgs} args - Arguments to find a AiPromptVersion
     * @example
     * // Get one AiPromptVersion
     * const aiPromptVersion = await prisma.aiPromptVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiPromptVersionFindUniqueArgs>(args: SelectSubset<T, AiPromptVersionFindUniqueArgs<ExtArgs>>): Prisma__AiPromptVersionClient<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiPromptVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiPromptVersionFindUniqueOrThrowArgs} args - Arguments to find a AiPromptVersion
     * @example
     * // Get one AiPromptVersion
     * const aiPromptVersion = await prisma.aiPromptVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiPromptVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, AiPromptVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiPromptVersionClient<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiPromptVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptVersionFindFirstArgs} args - Arguments to find a AiPromptVersion
     * @example
     * // Get one AiPromptVersion
     * const aiPromptVersion = await prisma.aiPromptVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiPromptVersionFindFirstArgs>(args?: SelectSubset<T, AiPromptVersionFindFirstArgs<ExtArgs>>): Prisma__AiPromptVersionClient<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiPromptVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptVersionFindFirstOrThrowArgs} args - Arguments to find a AiPromptVersion
     * @example
     * // Get one AiPromptVersion
     * const aiPromptVersion = await prisma.aiPromptVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiPromptVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, AiPromptVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiPromptVersionClient<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiPromptVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiPromptVersions
     * const aiPromptVersions = await prisma.aiPromptVersion.findMany()
     * 
     * // Get first 10 AiPromptVersions
     * const aiPromptVersions = await prisma.aiPromptVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiPromptVersionWithIdOnly = await prisma.aiPromptVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiPromptVersionFindManyArgs>(args?: SelectSubset<T, AiPromptVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiPromptVersion.
     * @param {AiPromptVersionCreateArgs} args - Arguments to create a AiPromptVersion.
     * @example
     * // Create one AiPromptVersion
     * const AiPromptVersion = await prisma.aiPromptVersion.create({
     *   data: {
     *     // ... data to create a AiPromptVersion
     *   }
     * })
     * 
     */
    create<T extends AiPromptVersionCreateArgs>(args: SelectSubset<T, AiPromptVersionCreateArgs<ExtArgs>>): Prisma__AiPromptVersionClient<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiPromptVersions.
     * @param {AiPromptVersionCreateManyArgs} args - Arguments to create many AiPromptVersions.
     * @example
     * // Create many AiPromptVersions
     * const aiPromptVersion = await prisma.aiPromptVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiPromptVersionCreateManyArgs>(args?: SelectSubset<T, AiPromptVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiPromptVersions and returns the data saved in the database.
     * @param {AiPromptVersionCreateManyAndReturnArgs} args - Arguments to create many AiPromptVersions.
     * @example
     * // Create many AiPromptVersions
     * const aiPromptVersion = await prisma.aiPromptVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiPromptVersions and only return the `id`
     * const aiPromptVersionWithIdOnly = await prisma.aiPromptVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiPromptVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, AiPromptVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiPromptVersion.
     * @param {AiPromptVersionDeleteArgs} args - Arguments to delete one AiPromptVersion.
     * @example
     * // Delete one AiPromptVersion
     * const AiPromptVersion = await prisma.aiPromptVersion.delete({
     *   where: {
     *     // ... filter to delete one AiPromptVersion
     *   }
     * })
     * 
     */
    delete<T extends AiPromptVersionDeleteArgs>(args: SelectSubset<T, AiPromptVersionDeleteArgs<ExtArgs>>): Prisma__AiPromptVersionClient<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiPromptVersion.
     * @param {AiPromptVersionUpdateArgs} args - Arguments to update one AiPromptVersion.
     * @example
     * // Update one AiPromptVersion
     * const aiPromptVersion = await prisma.aiPromptVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiPromptVersionUpdateArgs>(args: SelectSubset<T, AiPromptVersionUpdateArgs<ExtArgs>>): Prisma__AiPromptVersionClient<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiPromptVersions.
     * @param {AiPromptVersionDeleteManyArgs} args - Arguments to filter AiPromptVersions to delete.
     * @example
     * // Delete a few AiPromptVersions
     * const { count } = await prisma.aiPromptVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiPromptVersionDeleteManyArgs>(args?: SelectSubset<T, AiPromptVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiPromptVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiPromptVersions
     * const aiPromptVersion = await prisma.aiPromptVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiPromptVersionUpdateManyArgs>(args: SelectSubset<T, AiPromptVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiPromptVersions and returns the data updated in the database.
     * @param {AiPromptVersionUpdateManyAndReturnArgs} args - Arguments to update many AiPromptVersions.
     * @example
     * // Update many AiPromptVersions
     * const aiPromptVersion = await prisma.aiPromptVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiPromptVersions and only return the `id`
     * const aiPromptVersionWithIdOnly = await prisma.aiPromptVersion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AiPromptVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, AiPromptVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiPromptVersion.
     * @param {AiPromptVersionUpsertArgs} args - Arguments to update or create a AiPromptVersion.
     * @example
     * // Update or create a AiPromptVersion
     * const aiPromptVersion = await prisma.aiPromptVersion.upsert({
     *   create: {
     *     // ... data to create a AiPromptVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiPromptVersion we want to update
     *   }
     * })
     */
    upsert<T extends AiPromptVersionUpsertArgs>(args: SelectSubset<T, AiPromptVersionUpsertArgs<ExtArgs>>): Prisma__AiPromptVersionClient<$Result.GetResult<Prisma.$AiPromptVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiPromptVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptVersionCountArgs} args - Arguments to filter AiPromptVersions to count.
     * @example
     * // Count the number of AiPromptVersions
     * const count = await prisma.aiPromptVersion.count({
     *   where: {
     *     // ... the filter for the AiPromptVersions we want to count
     *   }
     * })
    **/
    count<T extends AiPromptVersionCountArgs>(
      args?: Subset<T, AiPromptVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiPromptVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiPromptVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiPromptVersionAggregateArgs>(args: Subset<T, AiPromptVersionAggregateArgs>): Prisma.PrismaPromise<GetAiPromptVersionAggregateType<T>>

    /**
     * Group by AiPromptVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiPromptVersionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiPromptVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiPromptVersionGroupByArgs['orderBy'] }
        : { orderBy?: AiPromptVersionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiPromptVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiPromptVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiPromptVersion model
   */
  readonly fields: AiPromptVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiPromptVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiPromptVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiPromptVersion model
   */
  interface AiPromptVersionFieldRefs {
    readonly id: FieldRef<"AiPromptVersion", 'String'>
    readonly promptKey: FieldRef<"AiPromptVersion", 'String'>
    readonly content: FieldRef<"AiPromptVersion", 'String'>
    readonly createdAt: FieldRef<"AiPromptVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiPromptVersion findUnique
   */
  export type AiPromptVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * Filter, which AiPromptVersion to fetch.
     */
    where: AiPromptVersionWhereUniqueInput
  }

  /**
   * AiPromptVersion findUniqueOrThrow
   */
  export type AiPromptVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * Filter, which AiPromptVersion to fetch.
     */
    where: AiPromptVersionWhereUniqueInput
  }

  /**
   * AiPromptVersion findFirst
   */
  export type AiPromptVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * Filter, which AiPromptVersion to fetch.
     */
    where?: AiPromptVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiPromptVersions to fetch.
     */
    orderBy?: AiPromptVersionOrderByWithRelationInput | AiPromptVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiPromptVersions.
     */
    cursor?: AiPromptVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiPromptVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiPromptVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiPromptVersions.
     */
    distinct?: AiPromptVersionScalarFieldEnum | AiPromptVersionScalarFieldEnum[]
  }

  /**
   * AiPromptVersion findFirstOrThrow
   */
  export type AiPromptVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * Filter, which AiPromptVersion to fetch.
     */
    where?: AiPromptVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiPromptVersions to fetch.
     */
    orderBy?: AiPromptVersionOrderByWithRelationInput | AiPromptVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiPromptVersions.
     */
    cursor?: AiPromptVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiPromptVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiPromptVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiPromptVersions.
     */
    distinct?: AiPromptVersionScalarFieldEnum | AiPromptVersionScalarFieldEnum[]
  }

  /**
   * AiPromptVersion findMany
   */
  export type AiPromptVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * Filter, which AiPromptVersions to fetch.
     */
    where?: AiPromptVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiPromptVersions to fetch.
     */
    orderBy?: AiPromptVersionOrderByWithRelationInput | AiPromptVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiPromptVersions.
     */
    cursor?: AiPromptVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiPromptVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiPromptVersions.
     */
    skip?: number
    distinct?: AiPromptVersionScalarFieldEnum | AiPromptVersionScalarFieldEnum[]
  }

  /**
   * AiPromptVersion create
   */
  export type AiPromptVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * The data needed to create a AiPromptVersion.
     */
    data: XOR<AiPromptVersionCreateInput, AiPromptVersionUncheckedCreateInput>
  }

  /**
   * AiPromptVersion createMany
   */
  export type AiPromptVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiPromptVersions.
     */
    data: AiPromptVersionCreateManyInput | AiPromptVersionCreateManyInput[]
  }

  /**
   * AiPromptVersion createManyAndReturn
   */
  export type AiPromptVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * The data used to create many AiPromptVersions.
     */
    data: AiPromptVersionCreateManyInput | AiPromptVersionCreateManyInput[]
  }

  /**
   * AiPromptVersion update
   */
  export type AiPromptVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * The data needed to update a AiPromptVersion.
     */
    data: XOR<AiPromptVersionUpdateInput, AiPromptVersionUncheckedUpdateInput>
    /**
     * Choose, which AiPromptVersion to update.
     */
    where: AiPromptVersionWhereUniqueInput
  }

  /**
   * AiPromptVersion updateMany
   */
  export type AiPromptVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiPromptVersions.
     */
    data: XOR<AiPromptVersionUpdateManyMutationInput, AiPromptVersionUncheckedUpdateManyInput>
    /**
     * Filter which AiPromptVersions to update
     */
    where?: AiPromptVersionWhereInput
    /**
     * Limit how many AiPromptVersions to update.
     */
    limit?: number
  }

  /**
   * AiPromptVersion updateManyAndReturn
   */
  export type AiPromptVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * The data used to update AiPromptVersions.
     */
    data: XOR<AiPromptVersionUpdateManyMutationInput, AiPromptVersionUncheckedUpdateManyInput>
    /**
     * Filter which AiPromptVersions to update
     */
    where?: AiPromptVersionWhereInput
    /**
     * Limit how many AiPromptVersions to update.
     */
    limit?: number
  }

  /**
   * AiPromptVersion upsert
   */
  export type AiPromptVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * The filter to search for the AiPromptVersion to update in case it exists.
     */
    where: AiPromptVersionWhereUniqueInput
    /**
     * In case the AiPromptVersion found by the `where` argument doesn't exist, create a new AiPromptVersion with this data.
     */
    create: XOR<AiPromptVersionCreateInput, AiPromptVersionUncheckedCreateInput>
    /**
     * In case the AiPromptVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiPromptVersionUpdateInput, AiPromptVersionUncheckedUpdateInput>
  }

  /**
   * AiPromptVersion delete
   */
  export type AiPromptVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
    /**
     * Filter which AiPromptVersion to delete.
     */
    where: AiPromptVersionWhereUniqueInput
  }

  /**
   * AiPromptVersion deleteMany
   */
  export type AiPromptVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiPromptVersions to delete
     */
    where?: AiPromptVersionWhereInput
    /**
     * Limit how many AiPromptVersions to delete.
     */
    limit?: number
  }

  /**
   * AiPromptVersion without action
   */
  export type AiPromptVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiPromptVersion
     */
    select?: AiPromptVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiPromptVersion
     */
    omit?: AiPromptVersionOmit<ExtArgs> | null
  }


  /**
   * Model CategoryRule
   */

  export type AggregateCategoryRule = {
    _count: CategoryRuleCountAggregateOutputType | null
    _min: CategoryRuleMinAggregateOutputType | null
    _max: CategoryRuleMaxAggregateOutputType | null
  }

  export type CategoryRuleMinAggregateOutputType = {
    id: string | null
    type: $Enums.TransactionType | null
    merchantName: string | null
    category: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryRuleMaxAggregateOutputType = {
    id: string | null
    type: $Enums.TransactionType | null
    merchantName: string | null
    category: string | null
    source: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryRuleCountAggregateOutputType = {
    id: number
    type: number
    merchantName: number
    category: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryRuleMinAggregateInputType = {
    id?: true
    type?: true
    merchantName?: true
    category?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryRuleMaxAggregateInputType = {
    id?: true
    type?: true
    merchantName?: true
    category?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryRuleCountAggregateInputType = {
    id?: true
    type?: true
    merchantName?: true
    category?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryRule to aggregate.
     */
    where?: CategoryRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryRules to fetch.
     */
    orderBy?: CategoryRuleOrderByWithRelationInput | CategoryRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategoryRules
    **/
    _count?: true | CategoryRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryRuleMaxAggregateInputType
  }

  export type GetCategoryRuleAggregateType<T extends CategoryRuleAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoryRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoryRule[P]>
      : GetScalarType<T[P], AggregateCategoryRule[P]>
  }




  export type CategoryRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryRuleWhereInput
    orderBy?: CategoryRuleOrderByWithAggregationInput | CategoryRuleOrderByWithAggregationInput[]
    by: CategoryRuleScalarFieldEnum[] | CategoryRuleScalarFieldEnum
    having?: CategoryRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryRuleCountAggregateInputType | true
    _min?: CategoryRuleMinAggregateInputType
    _max?: CategoryRuleMaxAggregateInputType
  }

  export type CategoryRuleGroupByOutputType = {
    id: string
    type: $Enums.TransactionType
    merchantName: string
    category: string
    source: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryRuleCountAggregateOutputType | null
    _min: CategoryRuleMinAggregateOutputType | null
    _max: CategoryRuleMaxAggregateOutputType | null
  }

  type GetCategoryRuleGroupByPayload<T extends CategoryRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryRuleGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryRuleGroupByOutputType[P]>
        }
      >
    >


  export type CategoryRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    merchantName?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["categoryRule"]>

  export type CategoryRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    merchantName?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["categoryRule"]>

  export type CategoryRuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    merchantName?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["categoryRule"]>

  export type CategoryRuleSelectScalar = {
    id?: boolean
    type?: boolean
    merchantName?: boolean
    category?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryRuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "merchantName" | "category" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["categoryRule"]>

  export type $CategoryRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CategoryRule"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.TransactionType
      merchantName: string
      category: string
      source: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["categoryRule"]>
    composites: {}
  }

  type CategoryRuleGetPayload<S extends boolean | null | undefined | CategoryRuleDefaultArgs> = $Result.GetResult<Prisma.$CategoryRulePayload, S>

  type CategoryRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryRuleCountAggregateInputType | true
    }

  export interface CategoryRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CategoryRule'], meta: { name: 'CategoryRule' } }
    /**
     * Find zero or one CategoryRule that matches the filter.
     * @param {CategoryRuleFindUniqueArgs} args - Arguments to find a CategoryRule
     * @example
     * // Get one CategoryRule
     * const categoryRule = await prisma.categoryRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryRuleFindUniqueArgs>(args: SelectSubset<T, CategoryRuleFindUniqueArgs<ExtArgs>>): Prisma__CategoryRuleClient<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CategoryRule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryRuleFindUniqueOrThrowArgs} args - Arguments to find a CategoryRule
     * @example
     * // Get one CategoryRule
     * const categoryRule = await prisma.categoryRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryRuleClient<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryRuleFindFirstArgs} args - Arguments to find a CategoryRule
     * @example
     * // Get one CategoryRule
     * const categoryRule = await prisma.categoryRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryRuleFindFirstArgs>(args?: SelectSubset<T, CategoryRuleFindFirstArgs<ExtArgs>>): Prisma__CategoryRuleClient<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CategoryRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryRuleFindFirstOrThrowArgs} args - Arguments to find a CategoryRule
     * @example
     * // Get one CategoryRule
     * const categoryRule = await prisma.categoryRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryRuleClient<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CategoryRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoryRules
     * const categoryRules = await prisma.categoryRule.findMany()
     * 
     * // Get first 10 CategoryRules
     * const categoryRules = await prisma.categoryRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryRuleWithIdOnly = await prisma.categoryRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryRuleFindManyArgs>(args?: SelectSubset<T, CategoryRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CategoryRule.
     * @param {CategoryRuleCreateArgs} args - Arguments to create a CategoryRule.
     * @example
     * // Create one CategoryRule
     * const CategoryRule = await prisma.categoryRule.create({
     *   data: {
     *     // ... data to create a CategoryRule
     *   }
     * })
     * 
     */
    create<T extends CategoryRuleCreateArgs>(args: SelectSubset<T, CategoryRuleCreateArgs<ExtArgs>>): Prisma__CategoryRuleClient<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CategoryRules.
     * @param {CategoryRuleCreateManyArgs} args - Arguments to create many CategoryRules.
     * @example
     * // Create many CategoryRules
     * const categoryRule = await prisma.categoryRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryRuleCreateManyArgs>(args?: SelectSubset<T, CategoryRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CategoryRules and returns the data saved in the database.
     * @param {CategoryRuleCreateManyAndReturnArgs} args - Arguments to create many CategoryRules.
     * @example
     * // Create many CategoryRules
     * const categoryRule = await prisma.categoryRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CategoryRules and only return the `id`
     * const categoryRuleWithIdOnly = await prisma.categoryRule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CategoryRule.
     * @param {CategoryRuleDeleteArgs} args - Arguments to delete one CategoryRule.
     * @example
     * // Delete one CategoryRule
     * const CategoryRule = await prisma.categoryRule.delete({
     *   where: {
     *     // ... filter to delete one CategoryRule
     *   }
     * })
     * 
     */
    delete<T extends CategoryRuleDeleteArgs>(args: SelectSubset<T, CategoryRuleDeleteArgs<ExtArgs>>): Prisma__CategoryRuleClient<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CategoryRule.
     * @param {CategoryRuleUpdateArgs} args - Arguments to update one CategoryRule.
     * @example
     * // Update one CategoryRule
     * const categoryRule = await prisma.categoryRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryRuleUpdateArgs>(args: SelectSubset<T, CategoryRuleUpdateArgs<ExtArgs>>): Prisma__CategoryRuleClient<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CategoryRules.
     * @param {CategoryRuleDeleteManyArgs} args - Arguments to filter CategoryRules to delete.
     * @example
     * // Delete a few CategoryRules
     * const { count } = await prisma.categoryRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryRuleDeleteManyArgs>(args?: SelectSubset<T, CategoryRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoryRules
     * const categoryRule = await prisma.categoryRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryRuleUpdateManyArgs>(args: SelectSubset<T, CategoryRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoryRules and returns the data updated in the database.
     * @param {CategoryRuleUpdateManyAndReturnArgs} args - Arguments to update many CategoryRules.
     * @example
     * // Update many CategoryRules
     * const categoryRule = await prisma.categoryRule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CategoryRules and only return the `id`
     * const categoryRuleWithIdOnly = await prisma.categoryRule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryRuleUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CategoryRule.
     * @param {CategoryRuleUpsertArgs} args - Arguments to update or create a CategoryRule.
     * @example
     * // Update or create a CategoryRule
     * const categoryRule = await prisma.categoryRule.upsert({
     *   create: {
     *     // ... data to create a CategoryRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoryRule we want to update
     *   }
     * })
     */
    upsert<T extends CategoryRuleUpsertArgs>(args: SelectSubset<T, CategoryRuleUpsertArgs<ExtArgs>>): Prisma__CategoryRuleClient<$Result.GetResult<Prisma.$CategoryRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CategoryRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryRuleCountArgs} args - Arguments to filter CategoryRules to count.
     * @example
     * // Count the number of CategoryRules
     * const count = await prisma.categoryRule.count({
     *   where: {
     *     // ... the filter for the CategoryRules we want to count
     *   }
     * })
    **/
    count<T extends CategoryRuleCountArgs>(
      args?: Subset<T, CategoryRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CategoryRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryRuleAggregateArgs>(args: Subset<T, CategoryRuleAggregateArgs>): Prisma.PrismaPromise<GetCategoryRuleAggregateType<T>>

    /**
     * Group by CategoryRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryRuleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryRuleGroupByArgs['orderBy'] }
        : { orderBy?: CategoryRuleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CategoryRule model
   */
  readonly fields: CategoryRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CategoryRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CategoryRule model
   */
  interface CategoryRuleFieldRefs {
    readonly id: FieldRef<"CategoryRule", 'String'>
    readonly type: FieldRef<"CategoryRule", 'TransactionType'>
    readonly merchantName: FieldRef<"CategoryRule", 'String'>
    readonly category: FieldRef<"CategoryRule", 'String'>
    readonly source: FieldRef<"CategoryRule", 'String'>
    readonly createdAt: FieldRef<"CategoryRule", 'DateTime'>
    readonly updatedAt: FieldRef<"CategoryRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CategoryRule findUnique
   */
  export type CategoryRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * Filter, which CategoryRule to fetch.
     */
    where: CategoryRuleWhereUniqueInput
  }

  /**
   * CategoryRule findUniqueOrThrow
   */
  export type CategoryRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * Filter, which CategoryRule to fetch.
     */
    where: CategoryRuleWhereUniqueInput
  }

  /**
   * CategoryRule findFirst
   */
  export type CategoryRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * Filter, which CategoryRule to fetch.
     */
    where?: CategoryRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryRules to fetch.
     */
    orderBy?: CategoryRuleOrderByWithRelationInput | CategoryRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryRules.
     */
    cursor?: CategoryRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryRules.
     */
    distinct?: CategoryRuleScalarFieldEnum | CategoryRuleScalarFieldEnum[]
  }

  /**
   * CategoryRule findFirstOrThrow
   */
  export type CategoryRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * Filter, which CategoryRule to fetch.
     */
    where?: CategoryRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryRules to fetch.
     */
    orderBy?: CategoryRuleOrderByWithRelationInput | CategoryRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoryRules.
     */
    cursor?: CategoryRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoryRules.
     */
    distinct?: CategoryRuleScalarFieldEnum | CategoryRuleScalarFieldEnum[]
  }

  /**
   * CategoryRule findMany
   */
  export type CategoryRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * Filter, which CategoryRules to fetch.
     */
    where?: CategoryRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoryRules to fetch.
     */
    orderBy?: CategoryRuleOrderByWithRelationInput | CategoryRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategoryRules.
     */
    cursor?: CategoryRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoryRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoryRules.
     */
    skip?: number
    distinct?: CategoryRuleScalarFieldEnum | CategoryRuleScalarFieldEnum[]
  }

  /**
   * CategoryRule create
   */
  export type CategoryRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * The data needed to create a CategoryRule.
     */
    data: XOR<CategoryRuleCreateInput, CategoryRuleUncheckedCreateInput>
  }

  /**
   * CategoryRule createMany
   */
  export type CategoryRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategoryRules.
     */
    data: CategoryRuleCreateManyInput | CategoryRuleCreateManyInput[]
  }

  /**
   * CategoryRule createManyAndReturn
   */
  export type CategoryRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * The data used to create many CategoryRules.
     */
    data: CategoryRuleCreateManyInput | CategoryRuleCreateManyInput[]
  }

  /**
   * CategoryRule update
   */
  export type CategoryRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * The data needed to update a CategoryRule.
     */
    data: XOR<CategoryRuleUpdateInput, CategoryRuleUncheckedUpdateInput>
    /**
     * Choose, which CategoryRule to update.
     */
    where: CategoryRuleWhereUniqueInput
  }

  /**
   * CategoryRule updateMany
   */
  export type CategoryRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CategoryRules.
     */
    data: XOR<CategoryRuleUpdateManyMutationInput, CategoryRuleUncheckedUpdateManyInput>
    /**
     * Filter which CategoryRules to update
     */
    where?: CategoryRuleWhereInput
    /**
     * Limit how many CategoryRules to update.
     */
    limit?: number
  }

  /**
   * CategoryRule updateManyAndReturn
   */
  export type CategoryRuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * The data used to update CategoryRules.
     */
    data: XOR<CategoryRuleUpdateManyMutationInput, CategoryRuleUncheckedUpdateManyInput>
    /**
     * Filter which CategoryRules to update
     */
    where?: CategoryRuleWhereInput
    /**
     * Limit how many CategoryRules to update.
     */
    limit?: number
  }

  /**
   * CategoryRule upsert
   */
  export type CategoryRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * The filter to search for the CategoryRule to update in case it exists.
     */
    where: CategoryRuleWhereUniqueInput
    /**
     * In case the CategoryRule found by the `where` argument doesn't exist, create a new CategoryRule with this data.
     */
    create: XOR<CategoryRuleCreateInput, CategoryRuleUncheckedCreateInput>
    /**
     * In case the CategoryRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryRuleUpdateInput, CategoryRuleUncheckedUpdateInput>
  }

  /**
   * CategoryRule delete
   */
  export type CategoryRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
    /**
     * Filter which CategoryRule to delete.
     */
    where: CategoryRuleWhereUniqueInput
  }

  /**
   * CategoryRule deleteMany
   */
  export type CategoryRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryRules to delete
     */
    where?: CategoryRuleWhereInput
    /**
     * Limit how many CategoryRules to delete.
     */
    limit?: number
  }

  /**
   * CategoryRule without action
   */
  export type CategoryRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryRule
     */
    select?: CategoryRuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CategoryRule
     */
    omit?: CategoryRuleOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    date: 'date',
    name: 'name',
    type: 'type',
    amount: 'amount',
    category: 'category',
    account: 'account',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const MonthlyExpenseAnalysisScalarFieldEnum: {
    id: 'id',
    month: 'month',
    type: 'type',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type MonthlyExpenseAnalysisScalarFieldEnum = (typeof MonthlyExpenseAnalysisScalarFieldEnum)[keyof typeof MonthlyExpenseAnalysisScalarFieldEnum]


  export const ExpenseCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    icon: 'icon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExpenseCategoryScalarFieldEnum = (typeof ExpenseCategoryScalarFieldEnum)[keyof typeof ExpenseCategoryScalarFieldEnum]


  export const IncomeCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    icon: 'icon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IncomeCategoryScalarFieldEnum = (typeof IncomeCategoryScalarFieldEnum)[keyof typeof IncomeCategoryScalarFieldEnum]


  export const PaymentMethodScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    icon: 'icon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentMethodScalarFieldEnum = (typeof PaymentMethodScalarFieldEnum)[keyof typeof PaymentMethodScalarFieldEnum]


  export const ImportChannelPaymentScalarFieldEnum: {
    channel: 'channel',
    paymentMethodId: 'paymentMethodId'
  };

  export type ImportChannelPaymentScalarFieldEnum = (typeof ImportChannelPaymentScalarFieldEnum)[keyof typeof ImportChannelPaymentScalarFieldEnum]


  export const AiPromptScalarFieldEnum: {
    id: 'id',
    key: 'key',
    content: 'content',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
  };

  export type AiPromptScalarFieldEnum = (typeof AiPromptScalarFieldEnum)[keyof typeof AiPromptScalarFieldEnum]


  export const AiPromptVersionScalarFieldEnum: {
    id: 'id',
    promptKey: 'promptKey',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type AiPromptVersionScalarFieldEnum = (typeof AiPromptVersionScalarFieldEnum)[keyof typeof AiPromptVersionScalarFieldEnum]


  export const CategoryRuleScalarFieldEnum: {
    id: 'id',
    type: 'type',
    merchantName: 'merchantName',
    category: 'category',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryRuleScalarFieldEnum = (typeof CategoryRuleScalarFieldEnum)[keyof typeof CategoryRuleScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    date?: DateTimeFilter<"Transaction"> | Date | string
    name?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    category?: StringFilter<"Transaction"> | string
    account?: StringFilter<"Transaction"> | string
    note?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    account?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    date?: DateTimeFilter<"Transaction"> | Date | string
    name?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    category?: StringFilter<"Transaction"> | string
    account?: StringFilter<"Transaction"> | string
    note?: StringNullableFilter<"Transaction"> | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    account?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    name?: StringWithAggregatesFilter<"Transaction"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    category?: StringWithAggregatesFilter<"Transaction"> | string
    account?: StringWithAggregatesFilter<"Transaction"> | string
    note?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type MonthlyExpenseAnalysisWhereInput = {
    AND?: MonthlyExpenseAnalysisWhereInput | MonthlyExpenseAnalysisWhereInput[]
    OR?: MonthlyExpenseAnalysisWhereInput[]
    NOT?: MonthlyExpenseAnalysisWhereInput | MonthlyExpenseAnalysisWhereInput[]
    id?: StringFilter<"MonthlyExpenseAnalysis"> | string
    month?: StringFilter<"MonthlyExpenseAnalysis"> | string
    type?: StringFilter<"MonthlyExpenseAnalysis"> | string
    content?: StringFilter<"MonthlyExpenseAnalysis"> | string
    createdAt?: DateTimeFilter<"MonthlyExpenseAnalysis"> | Date | string
  }

  export type MonthlyExpenseAnalysisOrderByWithRelationInput = {
    id?: SortOrder
    month?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyExpenseAnalysisWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MonthlyExpenseAnalysisWhereInput | MonthlyExpenseAnalysisWhereInput[]
    OR?: MonthlyExpenseAnalysisWhereInput[]
    NOT?: MonthlyExpenseAnalysisWhereInput | MonthlyExpenseAnalysisWhereInput[]
    month?: StringFilter<"MonthlyExpenseAnalysis"> | string
    type?: StringFilter<"MonthlyExpenseAnalysis"> | string
    content?: StringFilter<"MonthlyExpenseAnalysis"> | string
    createdAt?: DateTimeFilter<"MonthlyExpenseAnalysis"> | Date | string
  }, "id">

  export type MonthlyExpenseAnalysisOrderByWithAggregationInput = {
    id?: SortOrder
    month?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: MonthlyExpenseAnalysisCountOrderByAggregateInput
    _max?: MonthlyExpenseAnalysisMaxOrderByAggregateInput
    _min?: MonthlyExpenseAnalysisMinOrderByAggregateInput
  }

  export type MonthlyExpenseAnalysisScalarWhereWithAggregatesInput = {
    AND?: MonthlyExpenseAnalysisScalarWhereWithAggregatesInput | MonthlyExpenseAnalysisScalarWhereWithAggregatesInput[]
    OR?: MonthlyExpenseAnalysisScalarWhereWithAggregatesInput[]
    NOT?: MonthlyExpenseAnalysisScalarWhereWithAggregatesInput | MonthlyExpenseAnalysisScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MonthlyExpenseAnalysis"> | string
    month?: StringWithAggregatesFilter<"MonthlyExpenseAnalysis"> | string
    type?: StringWithAggregatesFilter<"MonthlyExpenseAnalysis"> | string
    content?: StringWithAggregatesFilter<"MonthlyExpenseAnalysis"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MonthlyExpenseAnalysis"> | Date | string
  }

  export type ExpenseCategoryWhereInput = {
    AND?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    OR?: ExpenseCategoryWhereInput[]
    NOT?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    id?: StringFilter<"ExpenseCategory"> | string
    name?: StringFilter<"ExpenseCategory"> | string
    color?: StringFilter<"ExpenseCategory"> | string
    icon?: StringFilter<"ExpenseCategory"> | string
    createdAt?: DateTimeFilter<"ExpenseCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ExpenseCategory"> | Date | string
  }

  export type ExpenseCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    OR?: ExpenseCategoryWhereInput[]
    NOT?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    color?: StringFilter<"ExpenseCategory"> | string
    icon?: StringFilter<"ExpenseCategory"> | string
    createdAt?: DateTimeFilter<"ExpenseCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ExpenseCategory"> | Date | string
  }, "id" | "name">

  export type ExpenseCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExpenseCategoryCountOrderByAggregateInput
    _max?: ExpenseCategoryMaxOrderByAggregateInput
    _min?: ExpenseCategoryMinOrderByAggregateInput
  }

  export type ExpenseCategoryScalarWhereWithAggregatesInput = {
    AND?: ExpenseCategoryScalarWhereWithAggregatesInput | ExpenseCategoryScalarWhereWithAggregatesInput[]
    OR?: ExpenseCategoryScalarWhereWithAggregatesInput[]
    NOT?: ExpenseCategoryScalarWhereWithAggregatesInput | ExpenseCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    name?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    color?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    icon?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ExpenseCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExpenseCategory"> | Date | string
  }

  export type IncomeCategoryWhereInput = {
    AND?: IncomeCategoryWhereInput | IncomeCategoryWhereInput[]
    OR?: IncomeCategoryWhereInput[]
    NOT?: IncomeCategoryWhereInput | IncomeCategoryWhereInput[]
    id?: StringFilter<"IncomeCategory"> | string
    name?: StringFilter<"IncomeCategory"> | string
    color?: StringFilter<"IncomeCategory"> | string
    icon?: StringFilter<"IncomeCategory"> | string
    createdAt?: DateTimeFilter<"IncomeCategory"> | Date | string
    updatedAt?: DateTimeFilter<"IncomeCategory"> | Date | string
  }

  export type IncomeCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IncomeCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: IncomeCategoryWhereInput | IncomeCategoryWhereInput[]
    OR?: IncomeCategoryWhereInput[]
    NOT?: IncomeCategoryWhereInput | IncomeCategoryWhereInput[]
    color?: StringFilter<"IncomeCategory"> | string
    icon?: StringFilter<"IncomeCategory"> | string
    createdAt?: DateTimeFilter<"IncomeCategory"> | Date | string
    updatedAt?: DateTimeFilter<"IncomeCategory"> | Date | string
  }, "id" | "name">

  export type IncomeCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IncomeCategoryCountOrderByAggregateInput
    _max?: IncomeCategoryMaxOrderByAggregateInput
    _min?: IncomeCategoryMinOrderByAggregateInput
  }

  export type IncomeCategoryScalarWhereWithAggregatesInput = {
    AND?: IncomeCategoryScalarWhereWithAggregatesInput | IncomeCategoryScalarWhereWithAggregatesInput[]
    OR?: IncomeCategoryScalarWhereWithAggregatesInput[]
    NOT?: IncomeCategoryScalarWhereWithAggregatesInput | IncomeCategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IncomeCategory"> | string
    name?: StringWithAggregatesFilter<"IncomeCategory"> | string
    color?: StringWithAggregatesFilter<"IncomeCategory"> | string
    icon?: StringWithAggregatesFilter<"IncomeCategory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"IncomeCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"IncomeCategory"> | Date | string
  }

  export type PaymentMethodWhereInput = {
    AND?: PaymentMethodWhereInput | PaymentMethodWhereInput[]
    OR?: PaymentMethodWhereInput[]
    NOT?: PaymentMethodWhereInput | PaymentMethodWhereInput[]
    id?: StringFilter<"PaymentMethod"> | string
    name?: StringFilter<"PaymentMethod"> | string
    color?: StringFilter<"PaymentMethod"> | string
    icon?: StringFilter<"PaymentMethod"> | string
    createdAt?: DateTimeFilter<"PaymentMethod"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentMethod"> | Date | string
    importChannelPayments?: ImportChannelPaymentListRelationFilter
  }

  export type PaymentMethodOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    importChannelPayments?: ImportChannelPaymentOrderByRelationAggregateInput
  }

  export type PaymentMethodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PaymentMethodWhereInput | PaymentMethodWhereInput[]
    OR?: PaymentMethodWhereInput[]
    NOT?: PaymentMethodWhereInput | PaymentMethodWhereInput[]
    color?: StringFilter<"PaymentMethod"> | string
    icon?: StringFilter<"PaymentMethod"> | string
    createdAt?: DateTimeFilter<"PaymentMethod"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentMethod"> | Date | string
    importChannelPayments?: ImportChannelPaymentListRelationFilter
  }, "id" | "name">

  export type PaymentMethodOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentMethodCountOrderByAggregateInput
    _max?: PaymentMethodMaxOrderByAggregateInput
    _min?: PaymentMethodMinOrderByAggregateInput
  }

  export type PaymentMethodScalarWhereWithAggregatesInput = {
    AND?: PaymentMethodScalarWhereWithAggregatesInput | PaymentMethodScalarWhereWithAggregatesInput[]
    OR?: PaymentMethodScalarWhereWithAggregatesInput[]
    NOT?: PaymentMethodScalarWhereWithAggregatesInput | PaymentMethodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentMethod"> | string
    name?: StringWithAggregatesFilter<"PaymentMethod"> | string
    color?: StringWithAggregatesFilter<"PaymentMethod"> | string
    icon?: StringWithAggregatesFilter<"PaymentMethod"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PaymentMethod"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentMethod"> | Date | string
  }

  export type ImportChannelPaymentWhereInput = {
    AND?: ImportChannelPaymentWhereInput | ImportChannelPaymentWhereInput[]
    OR?: ImportChannelPaymentWhereInput[]
    NOT?: ImportChannelPaymentWhereInput | ImportChannelPaymentWhereInput[]
    channel?: StringFilter<"ImportChannelPayment"> | string
    paymentMethodId?: StringFilter<"ImportChannelPayment"> | string
    paymentMethod?: XOR<PaymentMethodScalarRelationFilter, PaymentMethodWhereInput>
  }

  export type ImportChannelPaymentOrderByWithRelationInput = {
    channel?: SortOrder
    paymentMethodId?: SortOrder
    paymentMethod?: PaymentMethodOrderByWithRelationInput
  }

  export type ImportChannelPaymentWhereUniqueInput = Prisma.AtLeast<{
    channel?: string
    AND?: ImportChannelPaymentWhereInput | ImportChannelPaymentWhereInput[]
    OR?: ImportChannelPaymentWhereInput[]
    NOT?: ImportChannelPaymentWhereInput | ImportChannelPaymentWhereInput[]
    paymentMethodId?: StringFilter<"ImportChannelPayment"> | string
    paymentMethod?: XOR<PaymentMethodScalarRelationFilter, PaymentMethodWhereInput>
  }, "channel">

  export type ImportChannelPaymentOrderByWithAggregationInput = {
    channel?: SortOrder
    paymentMethodId?: SortOrder
    _count?: ImportChannelPaymentCountOrderByAggregateInput
    _max?: ImportChannelPaymentMaxOrderByAggregateInput
    _min?: ImportChannelPaymentMinOrderByAggregateInput
  }

  export type ImportChannelPaymentScalarWhereWithAggregatesInput = {
    AND?: ImportChannelPaymentScalarWhereWithAggregatesInput | ImportChannelPaymentScalarWhereWithAggregatesInput[]
    OR?: ImportChannelPaymentScalarWhereWithAggregatesInput[]
    NOT?: ImportChannelPaymentScalarWhereWithAggregatesInput | ImportChannelPaymentScalarWhereWithAggregatesInput[]
    channel?: StringWithAggregatesFilter<"ImportChannelPayment"> | string
    paymentMethodId?: StringWithAggregatesFilter<"ImportChannelPayment"> | string
  }

  export type AiPromptWhereInput = {
    AND?: AiPromptWhereInput | AiPromptWhereInput[]
    OR?: AiPromptWhereInput[]
    NOT?: AiPromptWhereInput | AiPromptWhereInput[]
    id?: StringFilter<"AiPrompt"> | string
    key?: StringFilter<"AiPrompt"> | string
    content?: StringFilter<"AiPrompt"> | string
    updatedAt?: DateTimeFilter<"AiPrompt"> | Date | string
    createdAt?: DateTimeFilter<"AiPrompt"> | Date | string
  }

  export type AiPromptOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AiPromptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: AiPromptWhereInput | AiPromptWhereInput[]
    OR?: AiPromptWhereInput[]
    NOT?: AiPromptWhereInput | AiPromptWhereInput[]
    content?: StringFilter<"AiPrompt"> | string
    updatedAt?: DateTimeFilter<"AiPrompt"> | Date | string
    createdAt?: DateTimeFilter<"AiPrompt"> | Date | string
  }, "id" | "key">

  export type AiPromptOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    _count?: AiPromptCountOrderByAggregateInput
    _max?: AiPromptMaxOrderByAggregateInput
    _min?: AiPromptMinOrderByAggregateInput
  }

  export type AiPromptScalarWhereWithAggregatesInput = {
    AND?: AiPromptScalarWhereWithAggregatesInput | AiPromptScalarWhereWithAggregatesInput[]
    OR?: AiPromptScalarWhereWithAggregatesInput[]
    NOT?: AiPromptScalarWhereWithAggregatesInput | AiPromptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiPrompt"> | string
    key?: StringWithAggregatesFilter<"AiPrompt"> | string
    content?: StringWithAggregatesFilter<"AiPrompt"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiPrompt"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AiPrompt"> | Date | string
  }

  export type AiPromptVersionWhereInput = {
    AND?: AiPromptVersionWhereInput | AiPromptVersionWhereInput[]
    OR?: AiPromptVersionWhereInput[]
    NOT?: AiPromptVersionWhereInput | AiPromptVersionWhereInput[]
    id?: StringFilter<"AiPromptVersion"> | string
    promptKey?: StringFilter<"AiPromptVersion"> | string
    content?: StringFilter<"AiPromptVersion"> | string
    createdAt?: DateTimeFilter<"AiPromptVersion"> | Date | string
  }

  export type AiPromptVersionOrderByWithRelationInput = {
    id?: SortOrder
    promptKey?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type AiPromptVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiPromptVersionWhereInput | AiPromptVersionWhereInput[]
    OR?: AiPromptVersionWhereInput[]
    NOT?: AiPromptVersionWhereInput | AiPromptVersionWhereInput[]
    promptKey?: StringFilter<"AiPromptVersion"> | string
    content?: StringFilter<"AiPromptVersion"> | string
    createdAt?: DateTimeFilter<"AiPromptVersion"> | Date | string
  }, "id">

  export type AiPromptVersionOrderByWithAggregationInput = {
    id?: SortOrder
    promptKey?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: AiPromptVersionCountOrderByAggregateInput
    _max?: AiPromptVersionMaxOrderByAggregateInput
    _min?: AiPromptVersionMinOrderByAggregateInput
  }

  export type AiPromptVersionScalarWhereWithAggregatesInput = {
    AND?: AiPromptVersionScalarWhereWithAggregatesInput | AiPromptVersionScalarWhereWithAggregatesInput[]
    OR?: AiPromptVersionScalarWhereWithAggregatesInput[]
    NOT?: AiPromptVersionScalarWhereWithAggregatesInput | AiPromptVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiPromptVersion"> | string
    promptKey?: StringWithAggregatesFilter<"AiPromptVersion"> | string
    content?: StringWithAggregatesFilter<"AiPromptVersion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AiPromptVersion"> | Date | string
  }

  export type CategoryRuleWhereInput = {
    AND?: CategoryRuleWhereInput | CategoryRuleWhereInput[]
    OR?: CategoryRuleWhereInput[]
    NOT?: CategoryRuleWhereInput | CategoryRuleWhereInput[]
    id?: StringFilter<"CategoryRule"> | string
    type?: EnumTransactionTypeFilter<"CategoryRule"> | $Enums.TransactionType
    merchantName?: StringFilter<"CategoryRule"> | string
    category?: StringFilter<"CategoryRule"> | string
    source?: StringFilter<"CategoryRule"> | string
    createdAt?: DateTimeFilter<"CategoryRule"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryRule"> | Date | string
  }

  export type CategoryRuleOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    merchantName?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    type_merchantName?: CategoryRuleTypeMerchantNameCompoundUniqueInput
    AND?: CategoryRuleWhereInput | CategoryRuleWhereInput[]
    OR?: CategoryRuleWhereInput[]
    NOT?: CategoryRuleWhereInput | CategoryRuleWhereInput[]
    type?: EnumTransactionTypeFilter<"CategoryRule"> | $Enums.TransactionType
    merchantName?: StringFilter<"CategoryRule"> | string
    category?: StringFilter<"CategoryRule"> | string
    source?: StringFilter<"CategoryRule"> | string
    createdAt?: DateTimeFilter<"CategoryRule"> | Date | string
    updatedAt?: DateTimeFilter<"CategoryRule"> | Date | string
  }, "id" | "type_merchantName">

  export type CategoryRuleOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    merchantName?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryRuleCountOrderByAggregateInput
    _max?: CategoryRuleMaxOrderByAggregateInput
    _min?: CategoryRuleMinOrderByAggregateInput
  }

  export type CategoryRuleScalarWhereWithAggregatesInput = {
    AND?: CategoryRuleScalarWhereWithAggregatesInput | CategoryRuleScalarWhereWithAggregatesInput[]
    OR?: CategoryRuleScalarWhereWithAggregatesInput[]
    NOT?: CategoryRuleScalarWhereWithAggregatesInput | CategoryRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CategoryRule"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"CategoryRule"> | $Enums.TransactionType
    merchantName?: StringWithAggregatesFilter<"CategoryRule"> | string
    category?: StringWithAggregatesFilter<"CategoryRule"> | string
    source?: StringWithAggregatesFilter<"CategoryRule"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CategoryRule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CategoryRule"> | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    date: Date | string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    category: string
    account: string
    note?: string | null
    createdAt?: Date | string
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    date: Date | string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    category: string
    account: string
    note?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    date: Date | string
    name: string
    type: $Enums.TransactionType
    amount: Decimal | DecimalJsLike | number | string
    category: string
    account: string
    note?: string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: StringFieldUpdateOperationsInput | string
    account?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyExpenseAnalysisCreateInput = {
    id?: string
    month: string
    type: string
    content: string
    createdAt?: Date | string
  }

  export type MonthlyExpenseAnalysisUncheckedCreateInput = {
    id?: string
    month: string
    type: string
    content: string
    createdAt?: Date | string
  }

  export type MonthlyExpenseAnalysisUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyExpenseAnalysisUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyExpenseAnalysisCreateManyInput = {
    id?: string
    month: string
    type: string
    content: string
    createdAt?: Date | string
  }

  export type MonthlyExpenseAnalysisUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MonthlyExpenseAnalysisUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCategoryCreateInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCategoryUncheckedCreateInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCategoryCreateManyInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExpenseCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncomeCategoryCreateInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IncomeCategoryUncheckedCreateInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IncomeCategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncomeCategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncomeCategoryCreateManyInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IncomeCategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncomeCategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentMethodCreateInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    importChannelPayments?: ImportChannelPaymentCreateNestedManyWithoutPaymentMethodInput
  }

  export type PaymentMethodUncheckedCreateInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    importChannelPayments?: ImportChannelPaymentUncheckedCreateNestedManyWithoutPaymentMethodInput
  }

  export type PaymentMethodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    importChannelPayments?: ImportChannelPaymentUpdateManyWithoutPaymentMethodNestedInput
  }

  export type PaymentMethodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    importChannelPayments?: ImportChannelPaymentUncheckedUpdateManyWithoutPaymentMethodNestedInput
  }

  export type PaymentMethodCreateManyInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentMethodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentMethodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportChannelPaymentCreateInput = {
    channel: string
    paymentMethod: PaymentMethodCreateNestedOneWithoutImportChannelPaymentsInput
  }

  export type ImportChannelPaymentUncheckedCreateInput = {
    channel: string
    paymentMethodId: string
  }

  export type ImportChannelPaymentUpdateInput = {
    channel?: StringFieldUpdateOperationsInput | string
    paymentMethod?: PaymentMethodUpdateOneRequiredWithoutImportChannelPaymentsNestedInput
  }

  export type ImportChannelPaymentUncheckedUpdateInput = {
    channel?: StringFieldUpdateOperationsInput | string
    paymentMethodId?: StringFieldUpdateOperationsInput | string
  }

  export type ImportChannelPaymentCreateManyInput = {
    channel: string
    paymentMethodId: string
  }

  export type ImportChannelPaymentUpdateManyMutationInput = {
    channel?: StringFieldUpdateOperationsInput | string
  }

  export type ImportChannelPaymentUncheckedUpdateManyInput = {
    channel?: StringFieldUpdateOperationsInput | string
    paymentMethodId?: StringFieldUpdateOperationsInput | string
  }

  export type AiPromptCreateInput = {
    id?: string
    key: string
    content: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type AiPromptUncheckedCreateInput = {
    id?: string
    key: string
    content: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type AiPromptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiPromptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiPromptCreateManyInput = {
    id?: string
    key: string
    content: string
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type AiPromptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiPromptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiPromptVersionCreateInput = {
    id?: string
    promptKey: string
    content: string
    createdAt?: Date | string
  }

  export type AiPromptVersionUncheckedCreateInput = {
    id?: string
    promptKey: string
    content: string
    createdAt?: Date | string
  }

  export type AiPromptVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    promptKey?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiPromptVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    promptKey?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiPromptVersionCreateManyInput = {
    id?: string
    promptKey: string
    content: string
    createdAt?: Date | string
  }

  export type AiPromptVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    promptKey?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiPromptVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    promptKey?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryRuleCreateInput = {
    id?: string
    type: $Enums.TransactionType
    merchantName: string
    category: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryRuleUncheckedCreateInput = {
    id?: string
    type: $Enums.TransactionType
    merchantName: string
    category: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    merchantName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    merchantName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryRuleCreateManyInput = {
    id?: string
    type: $Enums.TransactionType
    merchantName: string
    category: string
    source?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    merchantName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    merchantName?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    account?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    account?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    account?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type MonthlyExpenseAnalysisCountOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyExpenseAnalysisMaxOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type MonthlyExpenseAnalysisMinOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpenseCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExpenseCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IncomeCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IncomeCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IncomeCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ImportChannelPaymentListRelationFilter = {
    every?: ImportChannelPaymentWhereInput
    some?: ImportChannelPaymentWhereInput
    none?: ImportChannelPaymentWhereInput
  }

  export type ImportChannelPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentMethodCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMethodMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMethodMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMethodScalarRelationFilter = {
    is?: PaymentMethodWhereInput
    isNot?: PaymentMethodWhereInput
  }

  export type ImportChannelPaymentCountOrderByAggregateInput = {
    channel?: SortOrder
    paymentMethodId?: SortOrder
  }

  export type ImportChannelPaymentMaxOrderByAggregateInput = {
    channel?: SortOrder
    paymentMethodId?: SortOrder
  }

  export type ImportChannelPaymentMinOrderByAggregateInput = {
    channel?: SortOrder
    paymentMethodId?: SortOrder
  }

  export type AiPromptCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AiPromptMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AiPromptMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    content?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type AiPromptVersionCountOrderByAggregateInput = {
    id?: SortOrder
    promptKey?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type AiPromptVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    promptKey?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type AiPromptVersionMinOrderByAggregateInput = {
    id?: SortOrder
    promptKey?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryRuleTypeMerchantNameCompoundUniqueInput = {
    type: $Enums.TransactionType
    merchantName: string
  }

  export type CategoryRuleCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    merchantName?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    merchantName?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryRuleMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    merchantName?: SortOrder
    category?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ImportChannelPaymentCreateNestedManyWithoutPaymentMethodInput = {
    create?: XOR<ImportChannelPaymentCreateWithoutPaymentMethodInput, ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput> | ImportChannelPaymentCreateWithoutPaymentMethodInput[] | ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput[]
    connectOrCreate?: ImportChannelPaymentCreateOrConnectWithoutPaymentMethodInput | ImportChannelPaymentCreateOrConnectWithoutPaymentMethodInput[]
    createMany?: ImportChannelPaymentCreateManyPaymentMethodInputEnvelope
    connect?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
  }

  export type ImportChannelPaymentUncheckedCreateNestedManyWithoutPaymentMethodInput = {
    create?: XOR<ImportChannelPaymentCreateWithoutPaymentMethodInput, ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput> | ImportChannelPaymentCreateWithoutPaymentMethodInput[] | ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput[]
    connectOrCreate?: ImportChannelPaymentCreateOrConnectWithoutPaymentMethodInput | ImportChannelPaymentCreateOrConnectWithoutPaymentMethodInput[]
    createMany?: ImportChannelPaymentCreateManyPaymentMethodInputEnvelope
    connect?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
  }

  export type ImportChannelPaymentUpdateManyWithoutPaymentMethodNestedInput = {
    create?: XOR<ImportChannelPaymentCreateWithoutPaymentMethodInput, ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput> | ImportChannelPaymentCreateWithoutPaymentMethodInput[] | ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput[]
    connectOrCreate?: ImportChannelPaymentCreateOrConnectWithoutPaymentMethodInput | ImportChannelPaymentCreateOrConnectWithoutPaymentMethodInput[]
    upsert?: ImportChannelPaymentUpsertWithWhereUniqueWithoutPaymentMethodInput | ImportChannelPaymentUpsertWithWhereUniqueWithoutPaymentMethodInput[]
    createMany?: ImportChannelPaymentCreateManyPaymentMethodInputEnvelope
    set?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
    disconnect?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
    delete?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
    connect?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
    update?: ImportChannelPaymentUpdateWithWhereUniqueWithoutPaymentMethodInput | ImportChannelPaymentUpdateWithWhereUniqueWithoutPaymentMethodInput[]
    updateMany?: ImportChannelPaymentUpdateManyWithWhereWithoutPaymentMethodInput | ImportChannelPaymentUpdateManyWithWhereWithoutPaymentMethodInput[]
    deleteMany?: ImportChannelPaymentScalarWhereInput | ImportChannelPaymentScalarWhereInput[]
  }

  export type ImportChannelPaymentUncheckedUpdateManyWithoutPaymentMethodNestedInput = {
    create?: XOR<ImportChannelPaymentCreateWithoutPaymentMethodInput, ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput> | ImportChannelPaymentCreateWithoutPaymentMethodInput[] | ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput[]
    connectOrCreate?: ImportChannelPaymentCreateOrConnectWithoutPaymentMethodInput | ImportChannelPaymentCreateOrConnectWithoutPaymentMethodInput[]
    upsert?: ImportChannelPaymentUpsertWithWhereUniqueWithoutPaymentMethodInput | ImportChannelPaymentUpsertWithWhereUniqueWithoutPaymentMethodInput[]
    createMany?: ImportChannelPaymentCreateManyPaymentMethodInputEnvelope
    set?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
    disconnect?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
    delete?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
    connect?: ImportChannelPaymentWhereUniqueInput | ImportChannelPaymentWhereUniqueInput[]
    update?: ImportChannelPaymentUpdateWithWhereUniqueWithoutPaymentMethodInput | ImportChannelPaymentUpdateWithWhereUniqueWithoutPaymentMethodInput[]
    updateMany?: ImportChannelPaymentUpdateManyWithWhereWithoutPaymentMethodInput | ImportChannelPaymentUpdateManyWithWhereWithoutPaymentMethodInput[]
    deleteMany?: ImportChannelPaymentScalarWhereInput | ImportChannelPaymentScalarWhereInput[]
  }

  export type PaymentMethodCreateNestedOneWithoutImportChannelPaymentsInput = {
    create?: XOR<PaymentMethodCreateWithoutImportChannelPaymentsInput, PaymentMethodUncheckedCreateWithoutImportChannelPaymentsInput>
    connectOrCreate?: PaymentMethodCreateOrConnectWithoutImportChannelPaymentsInput
    connect?: PaymentMethodWhereUniqueInput
  }

  export type PaymentMethodUpdateOneRequiredWithoutImportChannelPaymentsNestedInput = {
    create?: XOR<PaymentMethodCreateWithoutImportChannelPaymentsInput, PaymentMethodUncheckedCreateWithoutImportChannelPaymentsInput>
    connectOrCreate?: PaymentMethodCreateOrConnectWithoutImportChannelPaymentsInput
    upsert?: PaymentMethodUpsertWithoutImportChannelPaymentsInput
    connect?: PaymentMethodWhereUniqueInput
    update?: XOR<XOR<PaymentMethodUpdateToOneWithWhereWithoutImportChannelPaymentsInput, PaymentMethodUpdateWithoutImportChannelPaymentsInput>, PaymentMethodUncheckedUpdateWithoutImportChannelPaymentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ImportChannelPaymentCreateWithoutPaymentMethodInput = {
    channel: string
  }

  export type ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput = {
    channel: string
  }

  export type ImportChannelPaymentCreateOrConnectWithoutPaymentMethodInput = {
    where: ImportChannelPaymentWhereUniqueInput
    create: XOR<ImportChannelPaymentCreateWithoutPaymentMethodInput, ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput>
  }

  export type ImportChannelPaymentCreateManyPaymentMethodInputEnvelope = {
    data: ImportChannelPaymentCreateManyPaymentMethodInput | ImportChannelPaymentCreateManyPaymentMethodInput[]
  }

  export type ImportChannelPaymentUpsertWithWhereUniqueWithoutPaymentMethodInput = {
    where: ImportChannelPaymentWhereUniqueInput
    update: XOR<ImportChannelPaymentUpdateWithoutPaymentMethodInput, ImportChannelPaymentUncheckedUpdateWithoutPaymentMethodInput>
    create: XOR<ImportChannelPaymentCreateWithoutPaymentMethodInput, ImportChannelPaymentUncheckedCreateWithoutPaymentMethodInput>
  }

  export type ImportChannelPaymentUpdateWithWhereUniqueWithoutPaymentMethodInput = {
    where: ImportChannelPaymentWhereUniqueInput
    data: XOR<ImportChannelPaymentUpdateWithoutPaymentMethodInput, ImportChannelPaymentUncheckedUpdateWithoutPaymentMethodInput>
  }

  export type ImportChannelPaymentUpdateManyWithWhereWithoutPaymentMethodInput = {
    where: ImportChannelPaymentScalarWhereInput
    data: XOR<ImportChannelPaymentUpdateManyMutationInput, ImportChannelPaymentUncheckedUpdateManyWithoutPaymentMethodInput>
  }

  export type ImportChannelPaymentScalarWhereInput = {
    AND?: ImportChannelPaymentScalarWhereInput | ImportChannelPaymentScalarWhereInput[]
    OR?: ImportChannelPaymentScalarWhereInput[]
    NOT?: ImportChannelPaymentScalarWhereInput | ImportChannelPaymentScalarWhereInput[]
    channel?: StringFilter<"ImportChannelPayment"> | string
    paymentMethodId?: StringFilter<"ImportChannelPayment"> | string
  }

  export type PaymentMethodCreateWithoutImportChannelPaymentsInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentMethodUncheckedCreateWithoutImportChannelPaymentsInput = {
    id?: string
    name: string
    color: string
    icon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentMethodCreateOrConnectWithoutImportChannelPaymentsInput = {
    where: PaymentMethodWhereUniqueInput
    create: XOR<PaymentMethodCreateWithoutImportChannelPaymentsInput, PaymentMethodUncheckedCreateWithoutImportChannelPaymentsInput>
  }

  export type PaymentMethodUpsertWithoutImportChannelPaymentsInput = {
    update: XOR<PaymentMethodUpdateWithoutImportChannelPaymentsInput, PaymentMethodUncheckedUpdateWithoutImportChannelPaymentsInput>
    create: XOR<PaymentMethodCreateWithoutImportChannelPaymentsInput, PaymentMethodUncheckedCreateWithoutImportChannelPaymentsInput>
    where?: PaymentMethodWhereInput
  }

  export type PaymentMethodUpdateToOneWithWhereWithoutImportChannelPaymentsInput = {
    where?: PaymentMethodWhereInput
    data: XOR<PaymentMethodUpdateWithoutImportChannelPaymentsInput, PaymentMethodUncheckedUpdateWithoutImportChannelPaymentsInput>
  }

  export type PaymentMethodUpdateWithoutImportChannelPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentMethodUncheckedUpdateWithoutImportChannelPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    icon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ImportChannelPaymentCreateManyPaymentMethodInput = {
    channel: string
  }

  export type ImportChannelPaymentUpdateWithoutPaymentMethodInput = {
    channel?: StringFieldUpdateOperationsInput | string
  }

  export type ImportChannelPaymentUncheckedUpdateWithoutPaymentMethodInput = {
    channel?: StringFieldUpdateOperationsInput | string
  }

  export type ImportChannelPaymentUncheckedUpdateManyWithoutPaymentMethodInput = {
    channel?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}