/// <reference path="../../@types/index.ts" />
import { entries } from '../../uitls/entries';
import { isDictionary } from '../../uitls/isDictionary';
import { fromEntries } from '../../uitls/fromEntries';

const snaleToCamel = <T extends string | number | symbol>(str: T) => {
    return str.toString().replace(/_./g, l => l[1].toUpperCase()) as SnakeToCamel<T>;
}

type ConvertValue<T> = 
    T extends (infer U)[] ? 
        U extends Dictionary ? 
            CamelCase<U>[] :
            U[] :
        T extends Dictionary ?
            CamelCase<T> :
            T;

const convertValue = <T>(val: T, converter: <U extends string, T extends Dictionary<U>>(obj: T) => CamelCase<T>): ConvertValue<T> => {
    if (Array.isArray(val)) {
        const ret = val.map((e: unknown) => isDictionary(e) ? converter(e) : e);
        return ret as ConvertValue<T>;
    } else if (isDictionary(val)) {
        return converter(val) as ConvertValue<T>;
    } else {
        return val as ConvertValue<T>;
    }
}

export const camelCase = <U extends string, T extends Dictionary<U>>(obj: T): CamelCase<T> => {
    const entry =  entries(obj)
    .map(([key, _]) => {
        const newVal = convertValue(obj[key], camelCase);
        return {[key]: [snaleToCamel(key), newVal]} as {[Key in typeof key]: [SnakeToCamel<Key>, ConvertValue<typeof obj[Key]>]};
    })
    .map((obj) => {
        return Object.values<typeof obj[keyof typeof obj]>(obj)[0];
    });

    return fromEntries(entry) as CamelCase<T>;
}
