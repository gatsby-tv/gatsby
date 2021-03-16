export type FetchResponse<K extends string, T> = {
  [key in K]?: T;
} & {
  loading?: boolean;
  error?: true | Error;
};

export type InfiniteFetchResponse<K extends string, T> = {
  [key in K]?: T[];
} & {
  loading?: boolean;
  error?: true | Error;
  generator: () => void;
};
