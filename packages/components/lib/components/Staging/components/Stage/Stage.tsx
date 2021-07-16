import React, { CSSProperties } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { useStaging } from '@lib/utilities';

import styles from '../../Staging.scss';

export interface StageProps {
  children?: React.ReactNode;
  className?: string;
  index: number;
}

export function Stage(props: StageProps): React.ReactElement {
  const { children, className, index } = props;
  const { stage } = useStaging();

  const classes = Class(className, styles.Stage);

  const style: CSSProperties = {
    left: `${100 * (index - stage)}%`,
  };

  return (
    <div style={style} className={classes}>
      {children}
    </div>
  );
}
