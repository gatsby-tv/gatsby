import React, { useCallback, useEffect } from 'react';
import { ifExists, useForm, Validators } from '@gatsby-tv/utilities';

import { Button, ButtonProps } from '@lib/components/Button';

import styles from './File.scss';

export interface FileProps
  extends Pick<
      React.InputHTMLAttributes<HTMLElement>,
      | 'capture'
      | 'disabled'
      | 'form'
      | 'name'
      | 'readOnly'
      | 'required'
      | 'value'
      | Exclude<keyof React.HTMLAttributes<HTMLElement>, 'onChange'>
    >,
    Pick<ButtonProps, 'unstyled' | 'animate' | 'tooltip' | 'icon' | 'size'> {
  id: string;
  onChange?: (
    value: string,
    id?: string,
    setError?: (id: string, message: string) => void,
    clearError?: (id: string) => void
  ) => void;
}

export function File(props: FileProps): React.ReactElement {
  const {
    id,
    className,
    children,
    onChange: onChangeHandler,
    unstyled,
    animate,
    tooltip,
    icon,
    size,
    required,
    value,
    ...rest
  } = props;
  const { errors, setValue, setError } = useForm();

  useEffect(() => {
    const validator = required
      ? Validators.required('File is required')
      : undefined;

    setValue(id, value);
    setError(id, validator?.(id, value));
  }, [id, value, required]);

  const onChange = useCallback(
    (event: any) => {
      onChangeHandler?.(event.target.value, id);
    },
    [id, onChangeHandler]
  );

  return (
    <>
      <input
        id={id}
        className={styles.VisuallyHidden}
        type="file"
        value={value}
        required={required}
        onChange={onChange}
        {...rest}
      />
      <Button
        className={className}
        asLabelFor={id}
        unstyled={unstyled}
        animate={animate}
        tooltip={tooltip}
        icon={icon}
        size={size}
        data-error={ifExists(errors[id])}
      >
        {children}
      </Button>
    </>
  );
}
