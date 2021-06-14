import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ifExists, classNames, useForm, Validator } from '@gatsby-tv/utilities';

import styles from './Field.scss';

export interface FieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLElement>,
    | 'id'
    | 'accept'
    | 'alt'
    | 'autoComplete'
    | 'capture'
    | 'checked'
    | 'formAction'
    | 'formEncType'
    | 'formMethod'
    | 'formNoValidate'
    | 'formTarget'
    | 'height'
    | 'max'
    | 'min'
    | 'multiple'
    | 'prefix'
    | 'size'
    | 'src'
    | 'step'
    | 'suffix'
    | 'type'
    | 'value'
    | 'width'
    | 'onChange'
  > {
  id: string;
  value: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'search';
  multiline?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  autoComplete?: boolean;
  validators?: Validator[];
  onChange?: (value: string, id?: string) => void;
}

export function Field(props: FieldProps): React.ReactElement {
  const {
    id,
    className,
    value,
    multiline,
    prefix,
    suffix,
    autoComplete,
    validators,
    onChange: onChangeHandler,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    onClick: onClickHandler,
    onKeyPress: onKeyPressHandler,
    ...rest
  } = props;

  const input = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const { setValue, errors, setError } = useForm();
  const [focus, setFocus] = useState(Boolean(props.autoFocus));
  const [invalid, setInvalid] = useState(Boolean(errors[id]));
  const error = invalid && errors[id];

  const classes = classNames(className, styles.Input);

  useEffect(() => {
    setValue(id, value);
    setError(
      id,
      validators?.map((validator) => validator(id, value ?? '')).find(Boolean)
    );
  }, [id, validators, value]);

  const onChange = useCallback(
    (event: any) => {
      onChangeHandler?.(event.target.value, id);
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
      setInvalid(Boolean(errors[id]));
      setFocus(false);
      onBlurHandler?.(event);
    },
    [errors, onBlurHandler]
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

  const InputComponent = multiline ? 'textarea' : 'input';

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
      data-error={ifExists(error)}
      onClick={onClick}
    >
      {PrefixMarkup}
      <InputComponent
        ref={input}
        id={id}
        value={value}
        autoComplete={autoComplete ? 'on' : 'off'}
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
