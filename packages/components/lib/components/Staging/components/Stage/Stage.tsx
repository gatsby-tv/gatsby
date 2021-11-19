import { CSSProperties, ReactNode, ReactElement } from 'react';
import { Class } from '@gatsby-tv/utilities';

import { useStage } from '@lib/utilities';

import styles from './Stage.scss';

export interface StageProps {
  children?: ReactNode;
  className?: string;
  index: number;
}

export function Stage(props: StageProps): ReactElement {
  const { children, className, index } = props;
  const { current, previous, sync } = useStage();

  const active = [current, previous].includes(index);
  const classes = Class(className, styles.Stage, active && styles.Active);
  const direction = Math.min(Math.max(index - current, -1), 1);

  const style: CSSProperties = {
    left: `${100 * direction}%`,
  };

  return (
    <div style={style} className={classes} onTransitionEnd={sync}>
      {children}
    </div>
  );
}
