import {
  useRef,
  useState,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
  ReactElement,
} from 'react';
import { Class, ifExists } from '@gatsby-tv/utilities';

import { Injection } from '@lib/components/Injection';
import { Optional } from '@lib/components/Optional';
import { EventListener } from '@lib/components/EventListener';

import styles from './Panel.scss';

type Touch = { clientX: number; clientY: number };

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
  touch: Touch,
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
  id?: string;
  className?: string;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  draggable?: boolean;
  overlay?: boolean;
  active?: boolean;
  zIndex?: number;
  onExit?: () => void;
}

export function Panel(props: PanelProps): ReactElement | null {
  const {
    children,
    id,
    className,
    direction = 'right',
    draggable = true,
    overlay,
    active,
    zIndex,
    onExit,
  } = props;
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => setMounted(Boolean(active)), [active]);

  useEffect(() => {
    /* Our intention is to change the visibility of the panel only once we
     * know that the browser has had the chance to paint the component in
     * its initial state (offscreen).
     *
     * This is also why we force reflow by requesting the element offsetHeight.
     */
    if (!ref?.offsetHeight) return;
    const id = window.requestAnimationFrame(() => setVisible(mounted));
    return () => window.cancelAnimationFrame(id);
  }, [ref, mounted]);

  useEffect(() => {
    if (!mounted) {
      const id = setTimeout(() => onExit?.(), 300);
      return () => clearTimeout(id);
    }
  }, [mounted]);

  useEffect(() => {
    if (!draggable) {
      setTouch({ type: 'end' });
    }
  }, [draggable]);

  const onKeyDown = useCallback((event: any) => {
    if (event.code === 'Escape') {
      setTouch({ type: 'end' });
      setMounted(false);
    }
  }, []);

  const onTouchStart = useCallback(
    (event: any) => {
      if (!ref || !draggable) return;
      setTouch({
        type: 'start',
        offset: getOffset(ref, event.touches[0] as Touch, direction),
        time: event.timeStamp,
      });
    },
    [ref, direction, draggable]
  );

  const onTouchMove = useCallback(
    (event: any) => {
      if (!ref || !draggable) return;
      setTouch({
        type: 'move',
        position: getOffset(ref, event.touches[0] as Touch, direction),
        time: event.timeStamp,
      });
    },
    [ref, direction, draggable]
  );

  const onTouchEnd = useCallback(
    (event: any) => {
      setTouch({ type: 'end' });
      if (
        touch.position > 0.5 ||
        (touch.position > 0.15 && touch.velocity > 0.015)
      ) {
        setMounted(false);
      }
    },
    [touch]
  );

  const classes = Class(
    className,
    styles.Container,
    !touch.active && styles.Slider
  );

  const transform =
    direction === 'right'
      ? {
          transform: `translateX(${
            100 * (visible && mounted ? touch.position : 1)
          }%)`,
        }
      : direction === 'left'
      ? {
          transform: `translateX(${
            -100 * (visible && mounted ? touch.position : 1)
          }%)`,
        }
      : direction === 'bottom'
      ? {
          transform: `translateY(${
            100 * (visible && mounted ? touch.position : 1)
          }%)`,
        }
      : {
          transform: `translateY(${
            -100 * (visible && mounted ? touch.position : 1)
          }%)`,
        };

  return active ? (
    <Optional
      component={Injection}
      active={overlay}
      $props={{ target: '$foreground' }}
    >
      <div
        ref={setRef}
        style={ifExists(zIndex, { zIndex })}
        className={Class(
          styles.Panel,
          overlay ? styles.Fixed : styles.Absolute
        )}
      >
        <div
          style={transform}
          className={classes}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {children}
        </div>
        <EventListener event="keydown" handler={onKeyDown} />
      </div>
    </Optional>
  ) : null;
}
