import { createContext, Dispatch, SetStateAction } from 'react';

export type BreadcrumbPath = {
  label: string;
  path: string;
};

export type BreadcrumbsContextType = {
  child?: BreadcrumbsContextType;
  crumb?: BreadcrumbPath;
  register: Dispatch<SetStateAction<BreadcrumbsContextType | undefined>>;
  digest: () => BreadcrumbPath[];
};

export const BreadcrumbsContext = createContext<
  BreadcrumbsContextType | undefined
>(undefined);
