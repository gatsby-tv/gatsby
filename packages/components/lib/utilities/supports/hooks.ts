import { useRef, useContext, useEffect } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { SupportsContext, SupportsContextType } from './context';

export function useSupportsContext(): SupportsContextType {
  const hasFlexGap = useRef<boolean | undefined>(undefined);
  const hasAspectRatio = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    if (hasFlexGap.current !== undefined) return;

    const flex = document.createElement('div');
    flex.style.display = 'flex';
    flex.style.flexDirection = 'column';
    flex.style.rowGap = '1px';
    flex.appendChild(document.createElement('div'));
    flex.appendChild(document.createElement('div'));
    document.body.appendChild(flex);
    hasFlexGap.current = flex.scrollHeight === 1;
    document.body.removeChild(flex);
  }, []);

  useEffect(() => {
    if (hasAspectRatio.current !== undefined) return;

    const aspect = document.createElement('div');
    aspect.style.display = 'block';
    aspect.style.width = '1px';
    // @ts-ignore
    aspect.style.aspectRatio = '1 / 2';
    document.body.appendChild(aspect);
    hasAspectRatio.current = aspect.scrollHeight === 2;
    document.body.removeChild(aspect);
  }, []);

  return {
    hasFlexGap: hasFlexGap.current ?? true,
    hasAspectRatio: hasAspectRatio.current ?? true,
  };
}

export function useSupports(): SupportsContextType {
  const context = useContext(SupportsContext);

  if (!context) {
    throw new ContextError('Supports');
  }

  return context;
}
