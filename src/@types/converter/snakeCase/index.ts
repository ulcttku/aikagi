/// <reference path="../../global.ts"/>

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
