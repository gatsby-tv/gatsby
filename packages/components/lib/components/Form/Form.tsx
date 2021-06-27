import React, { useState, useEffect, useCallback } from 'react';

import {
  useOptionalForm,
  Filter,
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
  'id' | 'onSubmit'
> & {
  id: string;
  filters?: Filter[];
  onSubmit?: (values: Record<string, any>, id?: string) => void;
};

export function Form(props: FormProps): React.ReactElement {
  const { id, filters = [], onSubmit: onSubmitHandler, ...rest } = props;
  const parent = useOptionalForm();

  const [values, setValues] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, FormErrorState>>({});

  useEffect(() => parent?.setValue(id, values), [id, values]);
  useEffect(() => {
    if (!parent) return;

    const promises = Object.values(errors).filter(
      (error) => error instanceof Promise
    );
    const other = Object.values(errors).filter(
      (error) => error instanceof FormError
    );

    parent.setError(id, other.find(Boolean) ?? promises.find(Boolean));
  }, [id, errors]);

  const setValue = useCallback(
    (id: string, value: unknown) =>
      setValues((current) => ({
        ...current,
        [id]: value,
      })),
    []
  );

  const setError = useCallback(
    (id: string, error: FormErrorState) =>
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
        const update = filters.reduce(
          (acc, current) =>
            Object.fromEntries(
              Object.entries(acc).filter(([key, value]) => current(key, value))
            ),
          values
        );
        onSubmitHandler?.(update, id);
      }
    },
    [id, values, errors, filters]
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
