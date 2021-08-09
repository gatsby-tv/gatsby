import { ReactNode, ReactElement } from 'react';

import { Portal } from '@lib/components/Portal';
import { useInjection } from '@lib/utilities/injection';

import { Target, TargetProps } from './components';

export type { TargetProps as InjectionTargetProps };

export interface InjectionProps {
  children?: ReactNode;
  target: string;
  index?: number;
}

export function Injection(props: InjectionProps): ReactElement {
  const { children, target, index } = props;
  const container = useInjection(
    index !== undefined ? `${target}.${index}` : target
  );

  return <Portal target={container}>{children}</Portal>;
}

Injection.Target = Target;
