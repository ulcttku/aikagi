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

type CamelCase<T> = Expand<ContractCamel<T>>;