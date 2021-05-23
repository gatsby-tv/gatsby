import { useRef, useState, useEffect, useCallback, RefObject } from 'react';

export type TimelineState = {
  ref: RefObject<HTMLDivElement>;
  scrubbing: boolean;
  position: number;
  events: Record<string, (event: any) => void>;
};

export function useTimeline(): TimelineState {
  const ref = useRef<HTMLDivElement>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [position, setPosition] = useState(0);

  const onContextMenu = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onPointerEnter = (event: any) => {
    if (!ref.current || !event.isPrimary) return;
    const { left, width } = ref.current.getBoundingClientRect();
    const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
    setPosition(value);
  };

  const onPointerDown = (event: any) => {
    // Ignore auxillary buttons (such as right/middle clicks).
    if (!ref.current || event.button !== 0 || !event.isPrimary) return;
    event.preventDefault();
    ref.current.setPointerCapture(event.pointerId);
    setScrubbing(true);
  };

  const onPointerMove = (event: any) => {
    if (!ref.current || !event.isPrimary) return;
    const { left, width } = ref.current.getBoundingClientRect();
    const value = Math.min(Math.max((event.clientX - left) / width, 0), 1);
    setPosition(value);
  };

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
      onContextMenu,
      onPointerEnter,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}
