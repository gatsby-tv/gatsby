import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import {
  ifExists,
  ifNotExists,
  ScrollContext,
  useParentRef,
  useResizeObserver,
} from "@gatsby-tv/utilities";

import { Box } from "@lib/components/Box";
import { cssProperty } from "@lib/styles/property";
import { EventHandler, Size } from "@lib/types";

export interface ScrollProps {
  children?: React.ReactNode;
  smooth?: boolean;
  hide?: boolean;
  maxw?: Size;
  maxh?: Size;
}

const ScrollStyle = styled.div<ScrollProps>`
  min-width: 100%;
  max-height: 100%;
  box-sizing: content-box;
  backface-visibility: hidden;
  overflow-x: hidden;
  overflow-y: scroll;
  ${(props) => cssProperty("scroll-behavior", ifExists(props.smooth, "smooth"))}

  &::-webkit-scrollbar {
    width: ${(props) => (props.hide ? "0" : "1rem")};
    height: ${(props) => (props.hide ? "0" : "1rem")};
  }

  &::-webkit-scrollbar-corner {
    color: transparent;
  }

  &::-webkit-scrollbar-track {
    color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.hide ? "transparent" : props.theme.colors.background[3].toString()};
    border-radius: 2rem;
    transition: all 100ms ease;
  }
`;

export function Scroll(props: ScrollProps): React.ReactElement {
  const { children, maxw, maxh, ...rest } = props;
  const [callbacks, setCallbacks] = useState<EventHandler[]>([]);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const scroll = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const parent = useParentRef<HTMLDivElement>(container);
  const scrollPosition = useRef<number>(0);

  useResizeObserver(parent, (content) => setHeight(content.blockSize));

  const addScrollListener = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => [...current, callback]),
    []
  );

  const removeScrollListener = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => current.filter((entry) => entry !== callback)),
    []
  );

  const handleScroll: EventHandler = useCallback(
    (event) => {
      if (scroll.current) {
        (scrollPosition as any).current = scroll.current.scrollTop;
      }
      callbacks.forEach((callback) => callback(event));
    },
    [callbacks]
  );

  const setScrollPosition = useCallback((value: number) => {
    (scrollPosition as any).current = value;
    if (scroll.current) {
      scroll.current.scrollTop = value;
    }
  }, []);

  const context = {
    scrollPosition,
    setScrollPosition,
    addScrollListener,
    removeScrollListener,
  };

  const boxProps = {
    ref: container,
    absolute: ifNotExists(maxh),
    expand: true,
    h: ifExists(height && ifNotExists(maxh), `${height}px`),
    maxh,
    maxw,
  };

  return (
    <ScrollContext.Provider value={context}>
      <Box {...boxProps}>
        <ScrollStyle ref={scroll} onScroll={handleScroll} {...rest}>
          {children}
        </ScrollStyle>
      </Box>
    </ScrollContext.Provider>
  );
}
