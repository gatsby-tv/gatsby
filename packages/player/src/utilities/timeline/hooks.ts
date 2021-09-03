import { useContext, useRef, useState, useEffect, useCallback } from 'react';
import { ContextError } from '@gatsby-tv/utilities';

import { TimelineContext, TimelineContextType } from './context';

export function useTimelineContext(): TimelineContextType {
  const ref = useRef<HTMLDivElement>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [position, setPosition] = useState(0);

  const onClick = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const onContextMenu = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const onPointerEnter = useCallback((event: any) => {
    if (!ref.current || !event.isPrimary) return;
    const { left, width } = ref.current.getBoundingClientRect();
    const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
    setPosition(value);
  }, []);

  const onPointerDown = useCallback((event: any) => {
    // Ignore auxillary buttons (such as right/middle clicks).
    if (!ref.current || event.button !== 0 || !event.isPrimary) return;
    event.preventDefault();
    ref.current.setPointerCapture(event.pointerId);
    setScrubbing(true);
  }, []);

  const onPointerMove = useCallback((event: any) => {
    if (!ref.current || !event.isPrimary) return;
    const { left, width } = ref.current.getBoundingClientRect();
    const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
    setPosition(value);
  }, []);

  const onPointerUp = useCallback(
    (event: any) => {
      if (!ref.current || !scrubbing || !event.isPrimary) return;
      ref.current.releasePointerCapture(event.pointerId);
      setScrubbing(false);
    },
    [scrubbing]
  );

  const onPointerCancel = useCallback(
    (event: any) => {
      if (!ref.current || !scrubbing) return;
      ref.current.releasePointerCapture(event.pointerId);
      setScrubbing(false);
    },
    [scrubbing]
  );

  return {
    ref,
    scrubbing,
    position,
    events: {
      onClick,
      onContextMenu,
      onPointerEnter,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}

export function useTimeline(): TimelineContextType {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new ContextError('Timeline');
  }

  return context;
}
