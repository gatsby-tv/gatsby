import React, { useCallback } from 'react';

import { useForm } from '@lib/utilities/form';
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
    ...rest
  } = props;
  const { errors, setError, clearError } = useForm();

  const onChange = useCallback(
    (event: any) => {
      onChangeHandler?.(event.target.value, id, setError, clearError);
    },
    [id, onChangeHandler]
  );

  return (
    <>
      <input
        id={id}
        className={styles.VisuallyHidden}
        type="file"
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
      >
        {children}
      </Button>
    </>
  );
}
