export declare type FetchResponse<K extends string, T> = {
    [key in K]?: T;
} & {
    loading?: boolean;
    error?: true | Error;
};
export declare type InfiniteFetchResponse<K extends string, T> = {
    [key in K]?: T[];
} & {
    loading?: boolean;
    error?: true | Error;
    generator: () => void;
};
//# sourceMappingURL=types.d.ts.map