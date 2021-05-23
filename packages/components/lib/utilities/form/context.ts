import { createContext } from 'react';
import { FormError } from './errors';

export interface FormContextType {
  errors: Record<string, FormError | undefined>;
  setError: (id: string, message: string) => void;
  clearError: (id: string) => void;
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
