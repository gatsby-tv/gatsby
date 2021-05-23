import React from 'react';
import { classNames } from '@gatsby-tv/utilities';

import { Duration } from '@lib/types';

import styles from './Activatable.scss';

export interface ActivatableProps extends React.DOMAttributes<Element> {
  children?: React.ReactNode;
  className?: string;
  active?: boolean;
  duration?: Duration;
  delay?: Duration;
}

export function Activatable(props: ActivatableProps): React.ReactElement {
  const { children, className, active, duration, delay, ...events } = props;

  const classes = classNames(
    className,
    styles.Activatable,
    active && styles.Active,
    duration && styles[`Duration-${duration}`],
    active && delay && styles[`Delay-${delay}`]
  );

  return (
    <div className={classes} {...events}>
      {children}
    </div>
  );
}
