import { useRef, useState, useEffect, RefObject } from 'react';

export function useComponentDidMount(): RefObject<boolean> {
  const mounted = useRef(false);
  useEffect(() => void (mounted.current = true), []);
  return mounted;
}

export function useComponentWillMount(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
