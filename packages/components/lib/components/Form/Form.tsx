import React, { useState, useCallback } from "react";

import { FormContext, FormError } from "@lib/utilities/form";

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
} from "./components";

export type {
  FieldProps as FormFieldProps,
  FileProps as FormFileProps,
  LabelProps as FormLabelProps,
  SelectProps as FormSelectProps,
  SliderProps as FormSliderProps,
};

export type FormProps = React.FormHTMLAttributes<HTMLElement>;

export function Form(props: FormProps): React.ReactElement {
  const [errors, setErrors] = useState<Record<string, FormError | undefined>>(
    {}
  );

  const setError = useCallback(
    (id: string, message: string) =>
      setErrors((current) => ({
        ...current,
        [id]: new FormError(id, message),
      })),
    []
  );

  const clearError = useCallback(
    (id: string) => setErrors((current) => ({ ...current, [id]: undefined })),
    []
  );

  return (
    <FormContext.Provider value={{ errors, setError, clearError }}>
      <form {...props} />
    </FormContext.Provider>
  );
}

Form.Field = Field;
Form.File = File;
Form.Label = Label;
Form.Select = Select;
Form.Slider = Slider;
