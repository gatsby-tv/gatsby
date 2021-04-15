import React from "react";
import { NoEntry } from "@gatsby-tv/icons";
import { ifExists, classNames } from "@gatsby-tv/utilities";

import { Icon } from "@lib/components/Icon";
import { Optional } from "@lib/components/Optional";
import { VisuallyHidden } from "@lib/components/VisuallyHidden";

import styles from "./FormLabel.scss";

export interface FormLabelProps {
  children?: React.ReactNode;
  id: string;
  className?: string;
  label: string;
  font?: string;
  help?: string;
  error?: Error;
  hidden?: boolean;
}

export function FormLabel(props: FormLabelProps): React.ReactElement {
  const { children, id, className, label, font, help, error, hidden } = props;

  const classes = classNames(
    className,
    styles.Label,
    hidden && styles.VisuallyHidden
  );

  const HelpMarkup =
    help && !error ? <div className={styles.Help}>{help}</div> : null;

  const ErrorMarkup = error ? (
    <div className={styles.Error}>{error.message}</div>
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
    <>
      <Optional
        component="span"
        active={Boolean(error)}
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
    </>
  );
}
