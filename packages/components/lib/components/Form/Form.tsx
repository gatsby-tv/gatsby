import React, { useState, useEffect, useCallback } from 'react';

import {
  useOptionalForm,
  FormContext,
  FormError,
  FormErrorState,
} from '@gatsby-tv/utilities';

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
  'id' | 'onSubmit' | 'onError'
> & {
  id: string;
  onSubmit?: (values: Record<string, any>, id?: string) => void;
  onError?: (error: FormError | undefined, id?: string) => void;
};

export function Form(props: FormProps): React.ReactElement {
  const {
    id,
    onSubmit: onSubmitHandler,
    onError: onErrorHandler,
    ...rest
  } = props;
  const parent = useOptionalForm();

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, FormErrorState>>({});

  useEffect(() => parent?.setValue(values, id), [id, values]);
  useEffect(() => {
    const promise = Object.values(errors)
      .filter((error) => error instanceof Promise)
      .find(Boolean) as Promise<FormError | undefined>;

    const error = Object.values(errors)
      .filter((error) => error instanceof FormError)
      .find(Boolean) as FormError;

    parent?.setError(error ?? promise, id);
    onErrorHandler?.(error, id);
  }, [id, errors]);

  const setValue = useCallback(
    (value: unknown, id: string) =>
      setValues((current) => ({
        ...current,
        [id]: value,
      })),
    []
  );

  const setError = useCallback(
    (error: FormErrorState, id: string) =>
      setErrors((current) => ({
        ...current,
        [id]: error,
      })),
    []
  );

  const onSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      if (Object.values(errors).some(Boolean)) return;
      onSubmitHandler?.(values, id);
    },
    [id, values, errors]
  );

  const context = {
    values,
    errors,
    setValue,
    setError,
  };

  return (
    <FormContext.Provider value={context}>
      <form id={id} onSubmit={onSubmit} {...rest} />
    </FormContext.Provider>
  );
}

Form.Field = Field;
Form.File = File;
Form.Label = Label;
Form.Select = Select;
Form.Slider = Slider;
