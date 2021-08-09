import { DOMAttributes, ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { Duration } from '@lib/types';

import styles from './Activatable.scss';

export interface ActivatableProps extends DOMAttributes<Element> {
  children?: ReactNode;
  className?: string;
  active?: boolean;
  duration?: Duration;
  delay?: Duration;
}

export function Activatable(props: ActivatableProps): ReactElement {
  const { children, className, active, duration, delay, ...events } = props;

  const classes = Class(
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
