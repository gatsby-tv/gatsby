import { ReactNode, ReactElement } from 'react';

import { Optional } from '@lib/components/Optional';

import styles from './Snack.scss';

export interface SnackProps {
  children?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export function Snack(props: SnackProps): ReactElement {
  const { children, prefix, suffix } = props;

  return (
    <Optional
      active={Boolean(prefix || suffix)}
      $props={{ className: styles.Snack }}
    >
      {prefix}
      {children}
      {suffix}
    </Optional>
  );
}
