import React from "react";
import { NoEntry } from "@gatsby-tv/icons";
import { ifExists, classNames } from "@gatsby-tv/utilities";

import { Icon } from "@lib/components/Icon";
import { Optional } from "@lib/components/Optional";
import { useForm } from "@lib/utilities/form";

import styles from "./Label.scss";

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

  const classes = classNames(
    className,
    styles.Label,
    hidden && styles.VisuallyHidden
  );

  const HelpMarkup =
    help && !errors[id] ? <div className={styles.Help}>{help}</div> : null;

  const ErrorMarkup = errors[id] ? (
    <div className={styles.Error}>{errors[id]?.message}</div>
  ) : null;

  const ErrorIconMarkup = errors[id] ? (
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
    </>
  );
}
