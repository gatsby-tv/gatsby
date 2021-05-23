import { useState, useEffect } from 'react';

const regex = /Android|webOS|iPhone|iPad|iPod|Blackberry|IEMobile|Opera Mini/i;

export function useMobileDetector(): boolean | undefined {
  const [mobile, setMobile] = useState<boolean | undefined>(() =>
    typeof window !== 'undefined'
      ? regex.test(window.navigator.userAgent)
      : undefined
  );

  useEffect(() => setMobile(() => regex.test(window.navigator.userAgent)));
  return mobile;
}
