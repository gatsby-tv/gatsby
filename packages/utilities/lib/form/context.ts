import { createContext } from 'react';

import { FormError } from '@lib/errors';

export interface FormContextType {
  values: Record<string, unknown>;
  setValue: (id: string, value: unknown) => void;
  errors: Record<string, FormError | undefined>;
  setError: (id: string, error: FormError | undefined) => void;
}

export interface FormSelectContextType {
  hover: string | undefined;
  setHover: (id: string | undefined) => void;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const FormSelectContext = createContext<
  FormSelectContextType | undefined
>(undefined);
