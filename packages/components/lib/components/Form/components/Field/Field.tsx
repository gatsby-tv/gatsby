import React, { useRef, useState, useCallback } from "react";
import { ifExists, classNames } from "@gatsby-tv/utilities";

import { useForm } from "@lib/utilities/form";

import styles from "./Field.scss";

export interface FieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLElement>,
    | "id"
    | "accept"
    | "alt"
    | "autoComplete"
    | "capture"
    | "checked"
    | "formAction"
    | "formEncType"
    | "formMethod"
    | "formNoValidate"
    | "formTarget"
    | "height"
    | "max"
    | "min"
    | "multiple"
    | "prefix"
    | "size"
    | "src"
    | "step"
    | "suffix"
    | "type"
    | "width"
    | "onChange"
  > {
  id: string;
  type?: "text" | "email" | "password" | "tel" | "search";
  multiline?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  autoComplete?: boolean;
  onChange?: (
    value: string,
    id?: string,
    setError?: (id: string, message: string) => void,
    clearError?: (id: string) => void
  ) => void;
}

export function Field(props: FieldProps): React.ReactElement {
  const {
    id,
    className,
    multiline,
    prefix,
    suffix,
    autoComplete,
    onChange: onChangeHandler,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    onClick: onClickHandler,
    onKeyPress: onKeyPressHandler,
    ...rest
  } = props;

  const input = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const { errors, setError, clearError } = useForm();
  const [focus, setFocus] = useState(Boolean(props.autoFocus));

  const classes = classNames(className, styles.Input);

  const onChange = useCallback(
    (event: any) => {
      onChangeHandler?.(event.target.value, id, setError, clearError);
    },
    [id, onChangeHandler]
  );

  const onFocus = useCallback(
    (event: any) => {
      setFocus(true);
      onFocusHandler?.(event);
    },
    [onFocusHandler]
  );

  const onBlur = useCallback(
    (event: any) => {
      setFocus(false);
      onBlurHandler?.(event);
    },
    [onBlurHandler]
  );

  const onClick = useCallback(
    (event: any) => {
      input.current?.focus();
      setFocus(true);
      onClickHandler?.(event);
    },
    [onClickHandler]
  );

  const onKeyPress = useCallback(
    (event: any) => {
      event.stopPropagation();
      onKeyPressHandler?.(event);
    },
    [onKeyPressHandler]
  );

  const InputComponent = multiline ? "textarea" : "input";

  const PrefixMarkup = prefix ? (
    <div className={styles.Decorator}>{prefix}</div>
  ) : null;

  const SuffixMarkup = suffix ? (
    <div className={styles.Decorator}>{suffix}</div>
  ) : null;

  return (
    <div
      className={classes}
      data-focus={ifExists(focus)}
      data-error={ifExists(errors[id])}
      onClick={onClick}
    >
      {PrefixMarkup}
      <InputComponent
        ref={input}
        id={id}
        autoComplete={autoComplete ? "on" : "off"}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        {...rest}
      />
      {SuffixMarkup}
    </div>
  );
}
