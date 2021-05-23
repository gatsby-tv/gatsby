import { useContext } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import {
  FormContext,
  FormSelectContext,
  FormContextType,
  FormSelectContextType,
} from './context';

export function useForm(): FormContextType {
  const context = useContext(FormContext);

  if (!context) {
    throw new ContextError('Form');
  }

  return context;
}

export function useFormSelect(): FormSelectContextType {
  const context = useContext(FormSelectContext);

  if (!context) {
    throw new ContextError('FormSelect');
  }

  return context;
}
