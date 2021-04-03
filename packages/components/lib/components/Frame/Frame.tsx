import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  FrameContext,
  useToggle,
  useResizeObserver,
} from "@gatsby-tv/utilities";

import { EventListener } from "@lib/components/EventListener";

import { MainFrame, TopFrame, SideFrame } from "./components";

const FrameStyle = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export interface FrameProps {
  children?: React.ReactNode;
  topbar?: React.FC<any>;
  sidebar?: React.FC<any>;
}

export function Frame(props: FrameProps): React.ReactElement {
  const screen = useRef<HTMLDivElement>(null);
  const topframe = useRef<HTMLDivElement>(null);
  const sideframe = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [screenX, setScreenX] = useState<number>(0);
  const [screenY, setScreenY] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [fullscreen, toggleFullscreen, setFullscreen] = useToggle(false);

  const handleFullscreen = useCallback(() => {
    setFullscreen(Boolean(document.fullscreenElement));
  }, [setFullscreen]);

  useResizeObserver(screen, (content) => {
    setScreenX(content.inlineSize);
    setScreenY(content.blockSize);
  });
  useResizeObserver(sideframe, (content) => setOffsetX(content.inlineSize));
  useResizeObserver(topframe, (content) => setOffsetY(content.blockSize));

  useEffect(() => {
    if (!mounted) return;

    if (fullscreen && !document.fullscreenElement) {
      document.body.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, [mounted, fullscreen]);

  useEffect(() => {
    setMounted(true);
    setFullscreen(Boolean(document.fullscreenElement));
  }, [setFullscreen]);

  const mainProps = {
    scrollHidden: fullscreen || screenX <= 650,
    offsetX,
    offsetY,
  };

  const context = {
    screen: { width: screenX, height: screenY },
    offset: { x: offsetX, y: offsetY },
    fullscreen: fullscreen as boolean,
    toggleFullscreen,
    setFullscreen,
  };

  return (
    <FrameContext.Provider value={context}>
      <FrameStyle ref={screen}>
        <TopFrame ref={topframe} topbar={props.topbar}>
          <SideFrame ref={sideframe} sidebar={props.sidebar}>
            <MainFrame {...mainProps}>{props.children}</MainFrame>
          </SideFrame>
        </TopFrame>
      </FrameStyle>
      <EventListener doc event="fullscreenchange" handler={handleFullscreen} />
    </FrameContext.Provider>
  );
}
