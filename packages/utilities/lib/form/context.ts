import { createContext, Dispatch, SetStateAction } from 'react';

import { FormError } from '@lib/errors';

export type FormErrorState =
  | FormError
  | Promise<FormError | undefined>
  | undefined;

export type FormChangeHandler<T = string> =
  | ((value: T, id: string) => void)
  | ((value: T) => void);

export interface FormContextType {
  values: Record<string, unknown>;
  setValue: (value: unknown, id: string) => void;
  errors: Record<string, FormErrorState>;
  setError: (error: FormErrorState, id: string) => void;
}

export interface FormSelectContextType {
  hover: string | undefined;
  setHover: (id: string | undefined) => void;
}

export type FormLabelContextType = [
  invalid: boolean,
  setInvalid: Dispatch<SetStateAction<boolean>>
];

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const FormSelectContext = createContext<
  FormSelectContextType | undefined
>(undefined);

export const FormLabelContext = createContext<FormLabelContextType | undefined>(
  undefined
);
