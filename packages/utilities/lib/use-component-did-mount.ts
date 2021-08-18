import { useRef, useEffect, RefObject } from 'react';

export function useComponentDidMount(): RefObject<boolean> {
  const mounted = useRef(false);
  useEffect(() => void (mounted.current = true), []);
  return mounted;
}
