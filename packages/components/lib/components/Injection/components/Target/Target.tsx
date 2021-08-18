import { useEffect, HTMLAttributes, ReactElement } from 'react';

import { useInjectionTarget } from '@lib/utilities/injection';

export interface TargetProps
  extends Omit<HTMLAttributes<Element>, 'id' | 'children'> {
  id: string;
  index?: number;
  onMount?: () => void;
}

export function Target(props: TargetProps): ReactElement | null {
  const { id: idProp, index, onMount, ...rest } = props;
  const id = index !== undefined ? `${idProp}.${index}` : idProp;
  const container = useInjectionTarget(id);

  useEffect(() => {
    if (!container) return;
    return onMount?.();
  }, [container]);

  return container ? <div ref={container} id={id} {...rest} /> : null;
}
