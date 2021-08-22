import { useRef, useEffect, RefObject } from 'react';

import { useComponentWillMount } from '@lib/use-component-will-mount';

export function useComponentDidMount(): RefObject<boolean> {
  const ref = useRef(false);
  const mounted = useComponentWillMount();
  useEffect(() => void (ref.current = mounted), [mounted]);
  return ref;
}
