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
      | Exclude<keyof React.HTMLAttributes<HTMLElement>, 'onChange'>
    >,
    Pick<ButtonProps, 'unstyled' | 'animate' | 'tooltip' | 'icon' | 'size'> {
  id: string;
  value: File | null;
  onChange?: (value: File | null, id?: string) => void;
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
    setError(id, validator?.(id, value ? JSON.stringify(value) : ''));
  }, [id, value, required]);

  const onChange = useCallback(
    (event: any) => {
      onChangeHandler?.(event.target.files?.[0], id);
    },
    [id, onChangeHandler]
  );

  return (
    <>
      <input
        id={id}
        className={styles.VisuallyHidden}
        type="file"
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
