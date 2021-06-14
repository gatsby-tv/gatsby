import React, { useState, useCallback } from 'react';
import { NoEntry } from '@gatsby-tv/icons';
import { ifExists, classNames, useForm } from '@gatsby-tv/utilities';

import { Icon } from '@lib/components/Icon';
import { Optional } from '@lib/components/Optional';

import styles from './Label.scss';

export interface LabelProps {
  children?: React.ReactNode;
  for: string;
  className?: string;
  label: string;
  help?: string;
  hidden?: boolean;
}

export function Label(props: LabelProps): React.ReactElement {
  const { children, for: id, className, label, help, hidden } = props;
  const { errors } = useForm();
  const [invalid, setInvalid] = useState(Boolean(errors[id]));
  const error = invalid && errors[id];

  const onBlur = useCallback(() => {
    setInvalid(Boolean(errors[id]));
  }, [id, errors]);

  const classes = classNames(
    className,
    styles.Label,
    hidden && styles.VisuallyHidden
  );

  const HelpMarkup =
    help && !error ? <div className={styles.Help}>{help}</div> : null;

  const ErrorMarkup = error ? (
    <div className={styles.Error}>{error?.message}</div>
  ) : null;

  const ErrorIconMarkup = error ? (
    <Icon
      className={styles.ErrorIcon}
      src={NoEntry}
      size="smaller"
      aria-label="Error"
    />
  ) : null;

  return (
    <div onBlur={onBlur}>
      <Optional
        component="span"
        active={Boolean(ErrorIconMarkup)}
        $props={{ className: styles.ErrorContainer }}
      >
        <label className={classes} htmlFor={id}>
          {label}
        </label>
        {ErrorIconMarkup}
      </Optional>
      {children}
      {ErrorMarkup}
      {HelpMarkup}
    </div>
  );
}
