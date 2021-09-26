import {
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  ReactElement,
} from 'react';

import { StagingContext } from '@lib/utilities';

import { Stage, StageProps } from './components/Stage';
import styles from './Staging.scss';

export type { StageProps as StagingStageProps };

export interface StagingProps {
  children?: ReactNode;
  stage: number;
}

export function Staging(props: StagingProps): ReactElement {
  const { children, stage } = props;
  const disabled = useRef(false);
  const [{ current, previous }, setState] = useState({
    current: stage,
    previous: stage,
  });

  useEffect(() => {
    if (disabled.current || stage === current) return;
    setState(({ current }) => ({ current: stage, previous: current }));
    disabled.current = true;
  }, [current, stage]);

  const onTransitionEnd = useCallback(() => {
    if (current === stage) return void (disabled.current = false);
    setState(({ current }) => ({ current: stage, previous: current }));
  }, [current, stage]);

  return (
    <StagingContext.Provider value={{ current, previous, onTransitionEnd }}>
      <div className={styles.Staging}>{children}</div>
    </StagingContext.Provider>
  );
}

Staging.Stage = Stage;
