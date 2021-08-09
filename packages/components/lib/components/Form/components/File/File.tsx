import {
  useMemo,
  useCallback,
  useEffect,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
} from 'react';
import {
  ifExists,
  useForm,
  Validators,
  Validator,
  FormChangeHandler,
} from '@gatsby-tv/utilities';

import { Button, ButtonProps } from '@lib/components/Button';

import styles from './File.scss';

export interface FileProps
  extends Pick<
      InputHTMLAttributes<HTMLElement>,
      | 'capture'
      | 'disabled'
      | 'form'
      | 'name'
      | 'accept'
      | 'readOnly'
      | 'required'
      | Exclude<keyof HTMLAttributes<HTMLElement>, 'onChange'>
    >,
    Pick<ButtonProps, 'unstyled' | 'animate' | 'tooltip' | 'icon' | 'size'> {
  id: string;
  value: File | null;
  onChange?: FormChangeHandler<File | null>;
}

export function File(props: FileProps): ReactElement {
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
    accept,
    ...rest
  } = props;
  const { errors, setValue, setError } = useForm();

  const validators = useMemo(
    () =>
      [
        required && Validators.required('File is required'),
        accept &&
          Validators.matches(
            accept.split(',').map((value) => value.trim()),
            'Unsupported file type'
          ),
      ].filter(Boolean) as Validator[],
    [required, accept]
  );

  useEffect(() => {
    const filetype = value ? value.type || 'application/octet-stream' : '';
    const error = validators
      .map((validator) => validator(filetype, id))
      .find(Boolean);

    setError(error, id);
  }, [id, value, validators]);

  useEffect(() => setValue(value, id), [id, value]);

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
        accept={accept}
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
