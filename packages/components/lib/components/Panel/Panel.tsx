import {
  useRef,
  useState,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
  ReactElement,
} from 'react';
import { Class, Exists, useRepaint } from '@gatsby-tv/utilities';

import { Injection } from '@lib/components/Injection';
import { Optional } from '@lib/components/Optional';
import { EventListener } from '@lib/components/EventListener';

import styles from './Panel.scss';

interface TouchState {
  active: boolean;
  position: number;
  offset: number;
  time: number;
  velocity: number;
}

type TouchAction =
  | { type: 'start'; offset: number; time: number }
  | { type: 'move'; position: number; time: number }
  | { type: 'end' };

function getOffset(
  ref: HTMLDivElement | null,
  touch: PointerEvent,
  direction: string
): number {
  switch (direction) {
    case 'right':
      return getOffset.value(ref, touch.clientX, 'left', 'width');
    case 'left':
      return 1 - getOffset.value(ref, touch.clientX, 'left', 'width');
    case 'bottom':
      return getOffset.value(ref, touch.clientY, 'top', 'height');
    case 'top':
      return 1 - getOffset.value(ref, touch.clientY, 'top', 'height');
    default:
      throw new Error(
        `getOffset called with incorrect direction: ${direction}`
      );
  }
}

getOffset.value = (
  ref: HTMLElement | null,
  base: number,
  direction: string,
  dimension: string
) => {
  const { [direction]: x, [dimension]: y } =
    ref?.getBoundingClientRect() as any;

  return Math.min(Math.max((base - x) / y, 0), 1);
};

export interface PanelProps {
  children?: ReactNode;
  className?: string;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  draggable?: boolean;
  overlay?: boolean;
  active?: boolean;
  zIndex?: number;
  onExit?: () => void;
  onTransitionEnd?: (event: any) => void;
}

export function Panel(props: PanelProps): ReactElement | null {
  const {
    children,
    className,
    direction = 'right',
    draggable,
    overlay,
    active,
    zIndex,
    onExit,
    onTransitionEnd: onTransitionEndHandler,
  } = props;

  const slider = useRef<HTMLDivElement>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const repaint = useRepaint();

  const [touch, setTouch] = useReducer(
    (state: TouchState, action: TouchAction) => {
      switch (action.type) {
        case 'start':
          return {
            ...state,
            active: true,
            offset: action.offset,
            time: action.time,
          };

        case 'move':
          if (!state.active) {
            return state;
          } else if (action.position - state.offset < 0) {
            return {
              ...state,
              position: 0,
              velocity: 0,
              offset: action.position,
              time: action.time,
            };
          } else {
            return {
              ...state,
              position: action.position - state.offset,
              time: action.time,
              velocity:
                (action.position - state.position) / (action.time - state.time),
            };
          }

        case 'end':
          return {
            ...state,
            active: false,
            offset: 0,
            position: 0,
            time: 0,
            velocity: 0,
          };
      }
    },
    {
      active: false,
      offset: 0,
      position: 0,
      time: 0,
      velocity: 0,
    }
  );

  useEffect(() => {
    if (!active) return;
    setMounted(true);
  }, [active]);

  useEffect(() => {
    if (active) return;
    repaint();
    const id = requestAnimationFrame(() => setVisible(false));
    return () => cancelAnimationFrame(id);
  }, [active]);

  useEffect(() => {
    if (!ref) return;
    repaint();
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [ref]);

  useEffect(() => {
    if (draggable) return;
    setTouch({ type: 'end' });
  }, [draggable]);

  const onTransitionEnd = useCallback(
    (event: any) => {
      if (event.target !== slider.current || visible) return;
      setMounted(false);
      onTransitionEndHandler?.(event);
    },
    [visible]
  );

  const onKeyDown = useCallback((event: any) => {
    if (event.code !== 'Escape') return;
    setTouch({ type: 'end' });
    onExit?.();
  }, []);

  const onPointerDown = useCallback(
    (event: any) => {
      if (!ref || !draggable) return;

      setTouch({
        type: 'start',
        offset: getOffset(ref, event, direction),
        time: event.timeStamp,
      });
    },
    [ref, direction, draggable]
  );

  const onPointerMove = useCallback(
    (event: any) => {
      if (!ref || !draggable) return;

      setTouch({
        type: 'move',
        position: getOffset(ref, event, direction),
        time: event.timeStamp,
      });
    },
    [ref, direction, draggable]
  );

  const onPointerUp = useCallback(() => {
    setTouch({ type: 'end' });

    if (
      touch.position > 0.5 ||
      (touch.position > 0.15 && touch.velocity > 0.015)
    ) {
      onExit?.();
    }
  }, [touch]);

  const classes = Class(
    className,
    styles.Container,
    !touch.active && styles.Slider
  );

  const transform =
    direction === 'right'
      ? { transform: `translateX(${100 * (visible ? touch.position : 1)}%)` }
      : direction === 'left'
      ? { transform: `translateX(${-100 * (visible ? touch.position : 1)}%)` }
      : direction === 'bottom'
      ? { transform: `translateY(${100 * (visible ? touch.position : 1)}%)` }
      : { transform: `translateY(${-100 * (visible ? touch.position : 1)}%)` };

  return mounted ? (
    <Optional
      component={Injection}
      active={overlay}
      $props={{ target: '$foreground' }}
    >
      <div
        ref={setRef}
        style={Exists(zIndex, { zIndex })}
        className={Class(
          styles.Panel,
          overlay ? styles.Fixed : styles.Absolute,
          visible && styles.Tinted
        )}
      >
        <div
          ref={slider}
          style={transform}
          className={classes}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onTransitionEnd={onTransitionEnd}
        >
          {children}
        </div>
        <EventListener event="keydown" handler={onKeyDown} />
      </div>
    </Optional>
  ) : null;
}
