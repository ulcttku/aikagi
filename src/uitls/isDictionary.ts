
export const isDictionary = (val: any): val is Dictionary => {
    return val !== null && typeof val === 'object' && val.constructor === Object;
}