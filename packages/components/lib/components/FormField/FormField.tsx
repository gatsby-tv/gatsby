import React, { useState, useRef, useCallback } from "react";
import { ifExists, classNames, useUniqueId } from "@gatsby-tv/utilities";

import { useForm } from "@lib/utilities/form";
import { FormLabel } from "@lib/components/FormLabel";

import styles from "./FormField.scss";

export interface FormFieldProps {
  id?: string;
  className?: string;
  label: string;
  labelHidden?: boolean;
  multiline?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  align?: "left" | "center" | "right";
  help?: string;
  error?: Error;
  clearButton?: boolean;
  disabled?: boolean;
  focused?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  autoComplete?: boolean;
  spellCheck?: boolean;
  maxLength?: number;
  max?: number | string;
  minLength?: number;
  min?: number | string;
  pattern?: string;
  type?: string;
  name?: string;
  role?: string;
  defaultValue?: string;
  onChange?: (value: string, id: string) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
}

export function FormField(props: FormFieldProps): React.ReactElement {
  const {
    id: idProp,
    className,
    label,
    labelHidden,
    multiline,
    prefix,
    suffix,
    align,
    help,
    error,
    focused,
    name,
    autoComplete,
    onChange: onChangeHandler = () => undefined,
    onFocus: onFocusHandler = () => undefined,
    onBlur: onBlurHandler = () => undefined,
    ...inputProps
  } = props;

  const id = useUniqueId(idProp ? `textfield-${idProp}` : "textfield");
  const { form } = useForm();

  const [focus, setFocus] = useState(Boolean(focused));
  const input = useRef<HTMLInputElement>(null);

  const onChange = useCallback((event: any) => {
    const value = event.currentTarget.value;
    onChangeHandler(value, id);
    if (name) {
      form.set(name, value);
    }
  }, [onChangeHandler]);

  const onFocus = useCallback((event: any) => {
    setFocus(true);
    onFocusHandler(event);
  }, [onFocusHandler]);

  const onBlur = useCallback((event: any) => {
    setFocus(false);
    onBlurHandler(event);
  }, [onBlurHandler]);

  const onClick = () => input?.current?.focus();
  const onKeyPress = (event: any) => event.stopPropagation();

  const classes = classNames(
    className,
    styles.Input,
    align && styles[`Input-align-${align}`],
  );

  const PrefixMarkup = prefix ? (
    <div className={styles.Decorator}>
      {prefix}
    </div>
  ) : null;

  const SuffixMarkup = suffix ? (
    <div className={styles.Decorator}>
      {suffix}
    </div>
  ) : null;

  const InputMarkup = React.createElement(multiline ? "textarea" : "input", {
    ref: input,
    id,
    autoComplete: autoComplete ? "on" : "off",
    onChange,
    onFocus,
    onBlur,
    onKeyPress,
    ...inputProps
  });

  return (
    <FormLabel
      id={id}
      label={label}
      help={help}
      error={error}
      hidden={labelHidden}
    >
      <div
        className={classes}
        data-focus={ifExists(focus)}
        data-error={ifExists(error)}
        onClick={onClick}
      >
        {PrefixMarkup}
        {InputMarkup}
        {SuffixMarkup}
      </div>
    </FormLabel>
  );
}
