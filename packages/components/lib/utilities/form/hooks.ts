import { useContext } from "react";

import { FormContext, FormContextType } from "./context";

export function useForm(): FormContextType {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("No Form context provided for component.");
  }

  return context;
}
