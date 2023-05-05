export declare function guid(): string;
export declare function getValueByKey(key: string, row: any): any;
export declare function omit<T extends Record<string, any>, K extends string, K2 extends keyof T>(obj: T, keys: (K | K2)[]): Omit<T, K>;
export declare function omitBy<T extends Record<string, any>, K extends keyof T>(object: T, callback: (value: T[K], key: K) => boolean): Partial<T>;
