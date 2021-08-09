import { ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { Spacing } from '@lib/types';

import styles from './Rule.scss';

export interface RuleProps {
  children?: ReactNode;
  className?: string;
  thin?: boolean;
  spacing?: Spacing;
}

export function Rule(props: RuleProps): ReactElement {
  const { children, className, thin, spacing = 'base' } = props;

  const classes = Class(
    className,
    styles.Rule,
    thin && styles.Thin,
    styles[`Spacing-${spacing}`]
  );

  if (children) {
    return (
      <div className={styles.Split}>
        <hr className={classes} />
        <span>{children}</span>
        <hr className={classes} />
      </div>
    );
  } else {
    return <hr className={classes} />;
  }
}
