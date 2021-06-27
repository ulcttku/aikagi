
type Cast<X, Y> = X extends Y ? X : Y;

type FromEntries<T> = 
    T extends ([infer Key, unknown])[] ?
            { [K in Cast<Key, string>]: Extract<T[number], [K, unknown]>[1] } :
            never;

export const fromEntries = <T extends unknown[][]>(object: T) => {
    return Object.fromEntries(object) as FromEntries<T>;
}