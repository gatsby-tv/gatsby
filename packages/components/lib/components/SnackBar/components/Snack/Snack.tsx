import React from 'react';

import { Optional } from '@lib/components/Optional';

import styles from '../../SnackBar.scss';

export interface SnackProps {
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export function Snack(props: SnackProps): React.ReactElement {
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
