/**
 * global.ts
 */
type Dictionary<K extends string = string, V = unknown> = {[key in K]: V};

type Expand<T> =
    T extends infer U ?
        { [K in keyof U]: U[K] } :
        never;


/**
 * converter/camelCase.ts
 */
 type SnakeToCamel<T> =
 T extends string ?
     T extends `${infer Head}_${infer Tail}` ?
         `${Head}${SnakeToCamel<Capitalize<Tail>>}` :
         T :
     never;

type ContractCamel<T extends Dictionary> = {
 [ K in keyof T as SnakeToCamel<K>] :
     T[K] extends (infer U)[] ?
         U extends Dictionary ?
             Expand<ContractCamel<U>>[] :
             U[] :
         T[K] extends Function ?
             T[K] :
             T[K] extends Dictionary ?
                 Expand<ContractCamel<T[K]>> :
                 T[K];
};

type CamelCase<T extends Dictionary> = Expand<ContractCamel<T>>;


/**
 * converter/snakeCase.ts
 */
 type SnakeOne<T extends string, Separator extends string> = 
 T extends `${infer Head}${Separator}${infer Tail}` ?
     Head extends '' ? 
         SnakeOne<`${Lowercase<Separator>}${Tail}`, Separator> :
         `${SnakeOne<Head, Separator>}_${SnakeOne<`${Lowercase<Separator>}${Tail}`, Separator>}` :
     T;
 
type SnakeMany<T extends string, Separators extends string> =
 Separators extends `${infer Separator}${infer RestSeparators}` ?
     RestSeparators extends '' ? 
         SnakeOne<T, Extract<Separator, string>> :
         SnakeMany<SnakeOne<T, Extract<Separator, string>>, Extract<RestSeparators, string>> :
     '';

type CamelToSnake<T> =
 T extends string ?
     SnakeMany<SnakeMany<T, 'ABCDEFGHIJKLM'>,'NOPQRSTUVWXYZ'> :
     never;

type ContractSnake<T extends Dictionary> = {
 [ K in keyof T as CamelToSnake<K>] :
     T[K] extends (infer U)[] ?
         U extends Dictionary ?
             Expand<ContractSnake<U>>[] :
             U[] :
         T[K] extends Function ?
             T[K] :
             T[K] extends Dictionary ?
                 Expand<ContractSnake<T[K]>> :
                 T[K];
};

type SnakeCase<T extends Dictionary> = Expand<ContractSnake<T>>;
