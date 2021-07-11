import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  FrameContext,
  useResizeObserver,
  useComponentWillMount,
} from '@gatsby-tv/utilities';

import { EventListener } from '@lib/components/EventListener';

import styles from './Frame.scss';
import { MainFrame, TopFrame, SideFrame } from './components';

export interface FrameProps {
  children?: React.ReactNode;
  topbar?: React.ReactElement;
  sidebar?: React.ReactElement;
}

export function Frame(props: FrameProps): React.ReactElement {
  const { children, topbar: Topbar, sidebar: Sidebar } = props;
  const mounted = useComponentWillMount();
  const screen = useRef<HTMLDivElement>(null);
  const topframe = useRef<HTMLDivElement>(null);
  const sideframe = useRef<HTMLDivElement>(null);
  const [topbar, setTopbarBase] = useState(true);
  const [sidebar, setSidebarBase] = useState(true);
  const [screenX, setScreenX] = useState(0);
  const [screenY, setScreenY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const onFullscreenChange = useCallback(
    () => setFullscreen(Boolean(document.fullscreenElement)),
    []
  );

  const setTopbar = useCallback(
    (value: boolean | ((current: boolean) => boolean)) =>
      setTopbarBase((current: boolean) => {
        if (!topframe.current) return false;
        return typeof value === 'function' ? value(current) : value;
      }),
    []
  );

  const setSidebar = useCallback(
    (value: boolean | ((current: boolean) => boolean)) =>
      setSidebarBase((current: boolean) => {
        if (!sideframe.current) return false;
        return typeof value === 'function' ? value(current) : value;
      }),
    []
  );

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

  useEffect(() => setFullscreen(Boolean(document.fullscreenElement)), []);

  const context = {
    screen: { width: screenX, height: screenY },
    offset: { x: sidebar ? offsetX : 0, y: topbar ? offsetY : 0 },
    fullscreen,
    setFullscreen,
    setTopbar,
    setSidebar,
  };

  return (
    <FrameContext.Provider value={context}>
      <div ref={screen} className={styles.Frame}>
        <TopFrame ref={topframe} topbar={Topbar} active={topbar}>
          <SideFrame ref={sideframe} sidebar={Sidebar} active={sidebar}>
            <MainFrame>{children}</MainFrame>
          </SideFrame>
        </TopFrame>
      </div>
      <EventListener
        doc
        event="fullscreenchange"
        handler={onFullscreenChange}
      />
    </FrameContext.Provider>
  );
}
