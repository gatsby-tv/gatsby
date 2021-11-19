import { ReactNode, ReactElement } from 'react';

import { useStagingContext, StagingContext } from '@lib/utilities';

import { Stage, StageProps } from './components/Stage';
import styles from './Staging.scss';

export type { StageProps as StagingStageProps };

export interface StagingProps {
  children?: ReactNode;
  stage: number;
}

export function Staging(props: StagingProps): ReactElement {
  const { children, stage } = props;
  const context = useStagingContext(stage);

  return (
    <StagingContext.Provider value={context}>
      <div className={styles.Staging}>{children}</div>
    </StagingContext.Provider>
  );
}

Staging.Stage = Stage;
