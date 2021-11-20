import {
  useRef,
  useState,
  useCallback,
  SetStateAction,
  ReactNode,
  ReactElement,
} from 'react';
import { FrameContext, useResizeObserver } from '@gatsby-tv/utilities';

import styles from './Frame.scss';
import { MainFrame, TopFrame, SideFrame } from './components';

export interface FrameProps {
  children?: ReactNode;
  className?: string;
  topbar?: ReactElement;
  sidebar?: ReactElement;
  flipped?: boolean;
}

export function Frame(props: FrameProps): ReactElement {
  const {
    children,
    className,
    topbar: Topbar,
    sidebar: Sidebar,
    flipped,
  } = props;

  const screen = useRef<HTMLDivElement>(null);
  const topframe = useRef<HTMLDivElement>(null);
  const sideframe = useRef<HTMLDivElement>(null);
  const [topbar, setTopbarBase] = useState(true);
  const [sidebar, setSidebarBase] = useState(true);
  const [screenX, setScreenX] = useState(0);
  const [screenY, setScreenY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const setTopbar = useCallback(
    (value: SetStateAction<boolean>) =>
      setTopbarBase((current: boolean) => {
        if (!topframe.current) return false;
        return typeof value === 'function' ? value(current) : value;
      }),
    []
  );

  const setSidebar = useCallback(
    (value: SetStateAction<boolean>) =>
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

  const context = {
    screen: { width: screenX, height: screenY },
    offset: { x: sidebar ? offsetX : 0, y: topbar ? offsetY : 0 },
    setTopbar,
    setSidebar,
  };

  const ContentMarkup = flipped ? (
    <SideFrame ref={sideframe} content={Sidebar} active={sidebar}>
      <TopFrame ref={topframe} content={Topbar} active={topbar}>
        <MainFrame className={className}>{children}</MainFrame>
      </TopFrame>
    </SideFrame>
  ) : (
    <TopFrame ref={topframe} content={Topbar} active={topbar}>
      <SideFrame ref={sideframe} content={Sidebar} active={sidebar}>
        <MainFrame className={className}>{children}</MainFrame>
      </SideFrame>
    </TopFrame>
  );

  return (
    <FrameContext.Provider value={context}>
      <div ref={screen} className={styles.Frame}>
        {ContentMarkup}
      </div>
    </FrameContext.Provider>
  );
}
