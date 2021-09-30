import { useRef, useState, useCallback, ReactNode, ReactElement } from 'react';
import {
  Class,
  Exists,
  ScrollContext,
  useScrollContext,
  useParentRef,
  useResizeObserver,
} from '@gatsby-tv/utilities';

import styles from './Scroll.scss';

export interface ScrollProps {
  children?: ReactNode;
  className?: string;
  smooth?: boolean;
  hide?: boolean;
  floating?: boolean;
  onScroll?: (event: any) => void;
}

export function Scroll(props: ScrollProps): ReactElement {
  const { children, className, smooth, hide, floating, onScroll } = props;

  const [height, setHeight] = useState<number | undefined>(undefined);
  const scroll = useRef<HTMLDivElement>(null);
  const parent = useParentRef<HTMLDivElement>(scroll);
  const context = useScrollContext<HTMLDivElement>(scroll);

  useResizeObserver(parent, (content) => setHeight(content.blockSize));

  const classes = Class(
    className,
    styles.ScrollBar,
    hide && styles.Hidden,
    smooth && styles.Smooth
  );

  return (
    <ScrollContext.Provider value={context}>
      <div
        ref={scroll}
        style={Exists(height && !floating, { maxHeight: `${height}px` })}
        className={classes}
        onScroll={onScroll}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
}
