import {
  useRef,
  useState,
  useEffect,
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
  topbar?: ReactElement;
  sidebar?: ReactElement;
}

export function Frame(props: FrameProps): ReactElement {
  const { children, topbar: Topbar, sidebar: Sidebar } = props;
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

  return (
    <FrameContext.Provider value={context}>
      <div ref={screen} className={styles.Frame}>
        <TopFrame ref={topframe} topbar={Topbar} active={topbar}>
          <SideFrame ref={sideframe} sidebar={Sidebar} active={sidebar}>
            <MainFrame>{children}</MainFrame>
          </SideFrame>
        </TopFrame>
      </div>
    </FrameContext.Provider>
  );
}
