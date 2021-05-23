import { useEffect, Dispatch, SetStateAction } from 'react';
import { useVolatileKey } from '@gatsby-tv/utilities';

export function useSignal(): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>
] {
  const [signal, setSignal] = useVolatileKey();

  useEffect(() => {
    const id = setTimeout(setSignal, 700);
    return () => clearTimeout(id);
  }, [signal]);

  return [signal, setSignal];
}
