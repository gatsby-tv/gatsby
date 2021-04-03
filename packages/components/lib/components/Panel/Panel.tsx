import React, {
  useRef,
  useState,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { ifExists, ifNotExists, useTheme } from "@gatsby-tv/utilities";

import { Box } from "@lib/components/Box";
import { Portal } from "@lib/components/Portal";
import { Optional } from "@lib/components/Optional";
import { EventListener } from "@lib/components/EventListener";
import { cssTransition } from "@lib/styles/transition";

interface TouchState {
  active: boolean;
  position: number;
  offset: number;
  time: number;
  velocity: number;
}

type TouchAction =
  | { type: "start"; offset: number; time: number }
  | { type: "move"; position: number; time: number }
  | { type: "end" };

export interface PanelProps {
  children?: React.ReactNode;
  id?: string;
  direction?: "top" | "right" | "bottom" | "left";
  draggable?: boolean;
  fullscreen?: boolean;
  active?: boolean;
  zIndex?: number;
  onExit?: () => void;
}

export function Panel(props: PanelProps): React.ReactElement | null {
  const {
    children,
    id,
    direction = "right",
    draggable = true,
    fullscreen,
    active,
    zIndex,
    onExit = () => undefined,
  } = props;
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [visibleBase, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const visible = visibleBase && active;

  const [touch, setTouch] = useReducer(
    (state: TouchState, action: TouchAction) => {
      switch (action.type) {
        case "start":
          return {
            ...state,
            active: true,
            offset: action.offset,
            time: action.time,
          };

        case "move":
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

        case "end":
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
    /* Our intention is to change the visibility of the panel only once we
     * know that the browser has had the chance to paint the component in
     * its initial state (offscreen).
     *
     * Consequently, since requestAnimationFrame fires *before* repaint, we
     * therefore have to wait two animation frames before changing the
     * visibility.
     */
    const id = window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => setVisible(Boolean(active)))
    );
    return () => window.cancelAnimationFrame(id);
  }, [active]);

  useEffect(() => {
    if (active) {
      setMounted(true);
    } else {
      const id = setTimeout(() => setMounted(false), theme.duration.fast);
      return () => clearTimeout(id);
    }
  }, [active]);

  useEffect(() => {
    if (!draggable) {
      setTouch({ type: "end" })
    }
  }, [draggable]);

  const onKeyDown = useCallback(
    (event: any) => {
      if (event.code === "Escape") {
        setTouch({ type: "end" });
        onExit();
      }
    },
    [onExit]
  );

  const onTouchStart = useCallback(
    (event: any) => {
      if (!ref.current || !draggable) return;
      const { clientX, clientY } = event.touches[0];
      if (direction === "right") {
        const { left, width } = ref.current.getBoundingClientRect();
        const value = Math.min(Math.max((clientX - left) / width, 0), 1);
        setTouch({ type: "start", offset: value, time: event.timeStamp });
      } else if (direction === "left") {
        const { left, width } = ref.current.getBoundingClientRect();
        const value = Math.min(Math.max((clientX - left) / width, 0), 1);
        setTouch({ type: "start", offset: 1 - value, time: event.timeStamp });
      } else if (direction === "bottom") {
        const { top, height } = ref.current.getBoundingClientRect();
        const value = Math.min(Math.max((clientY - top) / height, 0), 1);
        setTouch({ type: "start", offset: value, time: event.timeStamp });
      } else {
        const { top, height } = ref.current.getBoundingClientRect();
        const value = Math.min(Math.max((clientY - top) / height, 0), 1);
        setTouch({ type: "start", offset: 1 - value, time: event.timeStamp });
      }
    },
    [direction, draggable]
  );

  const onTouchMove = useCallback(
    (event: any) => {
      if (!ref.current || !draggable) return;
      const { clientX, clientY } = event.touches[0];
      if (direction === "right") {
        const { left, width } = ref.current.getBoundingClientRect();
        const value = Math.min(Math.max((clientX - left) / width, 0), 1);
        setTouch({ type: "move", position: value, time: event.timeStamp });
      } else if (direction === "left") {
        const { left, width } = ref.current.getBoundingClientRect();
        const value = Math.min(Math.max((clientX - left) / width, 0), 1);
        setTouch({ type: "move", position: 1 - value, time: event.timeStamp });
      } else if (direction === "bottom") {
        const { top, height } = ref.current.getBoundingClientRect();
        const value = Math.min(Math.max((clientY - top) / height, 0), 1);
        setTouch({ type: "move", position: value, time: event.timeStamp });
      } else {
        const { top, height } = ref.current.getBoundingClientRect();
        const value = Math.min(Math.max((clientY - top) / height, 0), 1);
        setTouch({ type: "move", position: 1 - value, time: event.timeStamp });
      }
    },
    [direction, draggable]
  );

  const onTouchEnd = useCallback(
    (event: any) => {
      setTouch({ type: "end" });
      if (
        touch.position > 0.5 ||
        (touch.position > 0.15 && touch.velocity > 0.015)
      ) {
        onExit();
      }
    },
    [touch]
  );

  const transition = cssTransition(
    "transform",
    theme.duration.fast,
    "ease-out"
  );

  const transform =
    direction === "right"
      ? {
          transform: `translateX(${100 * (visible ? touch.position : 1)}%)`,
        }
      : direction === "left"
      ? {
          transform: `translateX(${-100 * (visible ? touch.position : 1)}%)`,
        }
      : direction === "bottom"
      ? {
          transform: `translateY(${100 * (visible ? touch.position : 1)}%)`,
        }
      : {
          transform: `translateY(${-100 * (visible ? touch.position : 1)}%)`,
        };

  const portalProps = {
    active: fullscreen,
    $props: { id: id ? `panel-${id}` : "panel" },
  };

  const outerBoxProps = {
    ref,
    absolute: true,
    expand: true,
    zIndex: ifExists(fullscreen, zIndex),
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };

  const innerBoxProps = {
    style: transform,
    expand: true,
  };

  return mounted ? (
    <Optional component={Portal} {...portalProps}>
      <Box css={{ overflow: "hidden" }} {...outerBoxProps}>
        <Box css={ifNotExists(touch.active, transition)} {...innerBoxProps}>
          {children}
        </Box>
        <EventListener event="keydown" handler={onKeyDown} />
      </Box>
    </Optional>
  ) : null;
}
