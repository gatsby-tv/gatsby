import { useState, useEffect } from 'react';

export function useComponentWillMount(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
