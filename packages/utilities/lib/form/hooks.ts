import { useContext, useState } from 'react';
import { ContextError } from '@lib/errors';

import {
  FormContext,
  FormSelectContext,
  FormLabelContext,
  FormContextType,
  FormSelectContextType,
  FormLabelContextType,
} from './context';

export function useForm(): FormContextType {
  const context = useContext(FormContext);

  if (!context) {
    throw new ContextError('Form');
  }

  return context;
}

export function useOptionalForm(): FormContextType | undefined {
  return useContext(FormContext);
}

export function useFormSelect(): FormSelectContextType {
  const context = useContext(FormSelectContext);

  if (!context) {
    throw new ContextError('FormSelect');
  }

  return context;
}

export function useFormLabel(initial: boolean): FormLabelContextType {
  const context = useContext(FormLabelContext);
  const [invalid, setInvalid] = useState(initial);
  return context ?? [invalid, setInvalid];
}
