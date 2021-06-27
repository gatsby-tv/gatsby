import { useRef, useEffect } from 'react';

export function useComponentDidMount(): boolean {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return mounted.current;
}
