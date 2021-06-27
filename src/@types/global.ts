type Dictionary<K extends string = string, V = unknown> = {[key in K]: V};

type Expand<T> =
    T extends infer U ?
        { [K in keyof U]: U[K] } :
        never;