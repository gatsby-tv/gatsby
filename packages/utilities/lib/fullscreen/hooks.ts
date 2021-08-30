import { useContext, useState, useCallback, useEffect } from 'react';

import { useComponentDidMount } from '@lib/use-component-did-mount';
import { ContextError, UniqueContextError } from '@lib/errors';

import { FullscreenContext, FullscreenContextType } from './context';

export function useFullscreenContext(): FullscreenContextType {
  const context = useContext(FullscreenContext);

  if (context) {
    throw new UniqueContextError('Fullscreen');
  }

  const mounted = useComponentDidMount();
  const [fullscreen, setFullscreen] = useState(false);

  const onFullscreenChange = useCallback(
    () => setFullscreen(Boolean(document.fullscreenElement)),
    []
  );

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!mounted.current || !fullscreen || document.fullscreenElement) return;
    document.body.requestFullscreen();
  }, [fullscreen]);

  useEffect(() => {
    if (!mounted.current || fullscreen || !document.fullscreenElement) return;
    document.exitFullscreen();
  }, [fullscreen]);

  useEffect(() => setFullscreen(Boolean(document.fullscreenElement)), []);

  return [fullscreen, setFullscreen];
}

export function useFullscreen(): FullscreenContextType {
  const context = useContext(FullscreenContext);

  if (!context) {
    throw new ContextError('Fullscreen');
  }

  return context;
}
