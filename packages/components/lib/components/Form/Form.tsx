import React, { useState, useEffect, useCallback } from 'react';

import { useOptionalForm, FormContext, FormError } from '@gatsby-tv/utilities';

import {
  Field,
  FieldProps,
  File,
  FileProps,
  Label,
  LabelProps,
  Select,
  SelectProps,
  Slider,
  SliderProps,
} from './components';

export type {
  FieldProps as FormFieldProps,
  FileProps as FormFileProps,
  LabelProps as FormLabelProps,
  SelectProps as FormSelectProps,
  SliderProps as FormSliderProps,
};

export type FormProps = Omit<
  React.FormHTMLAttributes<HTMLElement>,
  'id' | 'onSubmit'
> & {
  id: string;
  onSubmit?: (values: Record<string, any>, id?: string) => void;
};

export function Form(props: FormProps): React.ReactElement {
  const { onSubmit: onSubmitHandler, id, ...rest } = props;
  const parent = useOptionalForm();

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, FormError | undefined>>(
    {}
  );

  useEffect(() => parent?.setValue(id, values), [id, values]);
  useEffect(
    () => parent?.setError(id, Object.values(errors).find(Boolean)),
    [id, errors]
  );

  const setValue = useCallback(
    (id: string, value: unknown) =>
      setValues((current) => ({
        ...current,
        [id]: value,
      })),
    []
  );

  const setError = useCallback(
    (id: string, error: FormError | undefined) =>
      setErrors((current) => ({
        ...current,
        [id]: error,
      })),
    []
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (!Object.values(errors).some(Boolean)) {
        onSubmitHandler?.(values, id);
      }
    },
    [id, values, errors]
  );

  return (
    <FormContext.Provider value={{ values, setValue, errors, setError }}>
      <form id={id} onSubmit={onSubmit} {...rest} />
    </FormContext.Provider>
  );
}

Form.Field = Field;
Form.File = File;
Form.Label = Label;
Form.Select = Select;
Form.Slider = Slider;
