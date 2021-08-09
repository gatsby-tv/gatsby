import { ReactNode, ReactElement } from 'react';

import { StagingContext } from '@lib/utilities';

import { Stage, StageProps } from './components/Stage';
import styles from './Staging.scss';

export type { Stage as StagingStageProps };

export interface StagingProps {
  children?: ReactNode;
  stage: number;
}

export function Staging(props: StagingProps): ReactElement {
  const { children, stage } = props;

  return (
    <StagingContext.Provider value={{ stage }}>
      <div className={styles.Staging}>{children}</div>
    </StagingContext.Provider>
  );
}

Staging.Stage = Stage;
