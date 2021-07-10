import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Spinner } from '@gatsby-tv/icons';
import {
  ifExists,
  classNames,
  useForm,
  useFormLabel,
  Validator,
  FormError,
} from '@gatsby-tv/utilities';

import { Icon } from '@lib/components/Icon';

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
    value = '',
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
  const [cancel, setCancel] = useState<(() => void) | undefined>(undefined);
  const [focus, setFocus] = useState(Boolean(props.autoFocus));
  const [invalid, setInvalid] = useFormLabel(Boolean(errors[id]));
  const [loading, setLoading] = useState(false);

  const promise =
    errors[id] instanceof Promise &&
    (errors[id] as Promise<FormError | undefined>);

  const error = errors[id] instanceof FormError && (errors[id] as FormError);

  const classes = classNames(className, styles.Input);

  useEffect(() => {
    if (!promise) return;

    const cancel = new Promise((_, reject) =>
      setCancel((current) => {
        current?.();
        return reject;
      })
    );

    Promise.race([promise, cancel])
      .then((error) => {
        setInvalid(Boolean(error));
        setError(id, error as FormError | undefined);
      })
      .catch(() => undefined);
  }, [id, promise]);

  useEffect(() => {
    if (!error) return;

    setCancel((current) => {
      current?.();
      return undefined;
    });
  }, [error]);

  useEffect(() => {
    if (!validators) return;
    const results = validators.map((validator) => validator(id, value));

    const promises = results.filter((result) => result instanceof Promise);
    const promise = promises.find(Boolean) && Promise.race(promises);

    const error = results
      .filter((result) => result instanceof FormError)
      .find(Boolean);

    setError(id, error ?? promise);
  }, [id, value, JSON.stringify(validators)]);

  useEffect(() => setValue(id, value), [id, value]);

  useEffect(() => {
    if (promise) {
      const id = setTimeout(() => setLoading(true), 200);
      return () => clearTimeout(id);
    }
    setLoading(false);
  }, [Boolean(promise)]);

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
      setInvalid(errors[id] instanceof FormError);
      setFocus(false);
      onBlurHandler?.(event);
    },
    [id, errors, onBlurHandler]
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

  const LoadingMarkup = loading ? <Icon src={Spinner} size="small" /> : null;

  return (
    <div
      className={classes}
      data-focus={ifExists(focus)}
      data-error={ifExists(invalid && error)}
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
        onKeyDown={(event: any) => event.stopPropagation()}
        {...rest}
      />
      {LoadingMarkup}
      {SuffixMarkup}
    </div>
  );
}
