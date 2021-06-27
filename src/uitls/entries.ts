type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

export const entries = <T extends object>(object: T) => {
    return Object.entries(object) as Entries<T>;
}