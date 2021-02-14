import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import {
  ifExists,
  ifNotExists,
  ScrollContext,
  useScrollContext,
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
  const [height, setHeight] = useState<number | undefined>(undefined);
  const scroll = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const parent = useParentRef<HTMLDivElement>(container);
  const context = useScrollContext<HTMLDivElement>(scroll);

  useResizeObserver(parent, (content) => setHeight(content.blockSize));

  const boxProps = {
    absolute: ifNotExists(maxh),
    expand: true,
    h: ifExists(height && ifNotExists(maxh), `${height}px`),
    maxh,
    maxw,
  };

  return (
    <ScrollContext.Provider value={context}>
      <Box ref={container} {...boxProps}>
        <ScrollStyle ref={scroll} {...rest}>
          {children}
        </ScrollStyle>
      </Box>
    </ScrollContext.Provider>
  );
}
