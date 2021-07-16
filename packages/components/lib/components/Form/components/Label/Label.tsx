import React, { useState, useEffect, useCallback } from 'react';
import { NoEntry } from '@gatsby-tv/icons';
import {
  ifExists,
  Class,
  useForm,
  FormError,
  FormLabelContext,
} from '@gatsby-tv/utilities';

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

  const waiting = errors[id] instanceof Promise;
  const error =
    invalid &&
    errors[id] instanceof FormError &&
    (errors[id] as FormError).message;

  const classes = Class(
    className,
    styles.Label,
    hidden && styles.VisuallyHidden
  );

  const HelpMarkup =
    help && !error ? <div className={styles.Help}>{help}</div> : null;

  const ErrorMarkup = error ? (
    <div className={styles.Error}>{error}</div>
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
    <FormLabelContext.Provider value={[invalid, setInvalid]}>
      <div>
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
    </FormLabelContext.Provider>
  );
}
