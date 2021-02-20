import { createContext } from "react";

export interface FormContextType {
  form: FormData;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);
