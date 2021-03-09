import { useRef, useState, useEffect, RefObject } from "react";

export function useTimeline(): {
  ref: RefObject<HTMLDivElement>;
  scrubbing: boolean;
  position: number;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const onContextMenu = (event: any) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const onTouchStart = (event: any) => {
      if (event.cancelable) {
        event.preventDefault();
      }
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

    if (ref.current) {
      ref.current.addEventListener("contextmenu", onContextMenu);
      ref.current.addEventListener("touchstart", onTouchStart, {
        passive: false,
      });
      ref.current.addEventListener("pointerenter", onPointerEnter);
      ref.current.addEventListener("pointerdown", onPointerDown);
      ref.current.addEventListener("pointermove", onPointerMove);

      return () => {
        if (ref.current) {
          ref.current.removeEventListener("contextmenu", onContextMenu);
          ref.current.removeEventListener("touchstart", onTouchStart);
          ref.current.removeEventListener("pointerenter", onPointerEnter);
          ref.current.removeEventListener("pointerdown", onPointerDown);
          ref.current.removeEventListener("pointermove", onPointerMove);
        }
      };
    }
  }, []);

  useEffect(() => {
    const onPointerUp = (event: any) => {
      if (!ref.current || !scrubbing || !event.isPrimary) return;
      ref.current.releasePointerCapture(event.pointerId);
      setScrubbing(false);
    };
    const onPointerCancel = (event: any) => {
      if (!ref.current || !scrubbing) return;
      ref.current.releasePointerCapture(event.pointerId);
      setScrubbing(false);
    };

    if (ref.current) {
      ref.current.addEventListener("pointerup", onPointerUp);
      ref.current.addEventListener("pointercancel", onPointerCancel);

      return () => {
        if (ref.current) {
          ref.current.removeEventListener("pointerup", onPointerUp);
          ref.current.removeEventListener("pointercancel", onPointerCancel);
        }
      };
    }
  }, [scrubbing]);

  return { ref, scrubbing, position };
}
