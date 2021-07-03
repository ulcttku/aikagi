import { entries } from '../../uitls/entries';
import { isDictionary } from '../../uitls/isDictionary';
import { fromEntries } from '../../uitls/fromEntries';

const camelToSnake = <T extends string | number | symbol>(str: T) => {
    return str.toString().replace(/[ABCEDFGHIJKLMNOPQRSTUVWXYZ]/g, l => `_${l.toLowerCase()}`) as CamelToSnake<T>;
}

type ConvertValue<T> = 
    T extends (infer U)[] ? 
        U extends Dictionary ? 
            SnakeCase<U>[] :
            U[] :
        T extends Dictionary ?
            SnakeCase<T> :
            T;

const convertValue = <T>(val: T, converter: <U extends string, T extends Dictionary<U>>(obj: T) => SnakeCase<T>): ConvertValue<T> => {
    if (Array.isArray(val)) {
        const ret = val.map((e: unknown) => isDictionary(e) ? converter(e) : e);
        return ret as ConvertValue<T>;
    } else if (isDictionary(val)) {
        return converter(val) as ConvertValue<T>;
    } else {
        return val as ConvertValue<T>;
    }
}

export const snakeCase = <U extends string, T extends Dictionary<U>>(obj: T): SnakeCase<T> => {
    const entry =  entries(obj)
    .map(([key, _]) => {
        const newVal = convertValue(obj[key], snakeCase);
        return {[key]: [camelToSnake(key), newVal]} as {[Key in typeof key]: [CamelToSnake<Key>, ConvertValue<typeof obj[Key]>]};
    })
    .map((obj) => {
        return Object.values<typeof obj[keyof typeof obj]>(obj)[0];
    });

    return fromEntries(entry) as SnakeCase<T>;
}
