import { useState, useEffect, ReactElement } from 'react';
import { Spinner } from '@gatsby-tv/icons';
import { Class, useSnackBarState, useRepaint } from '@gatsby-tv/utilities';

import { Injection } from '@lib/components/Injection';
import { Icon } from '@lib/components/Icon';

import { Snack, SnackProps } from './components/Snack';

import styles from './SnackBar.scss';

export type { SnackProps };
export { Snack };

export function SnackBar(): ReactElement | null {
  const { content, active } = useSnackBarState();
  const repaint = useRepaint();
  const [mounted, setMounted] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    repaint();
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [ref]);

  useEffect(() => {
    if (content) return;
    setMounted(false);
  }, [content]);

  const ContentMarkup =
    content instanceof Promise ? <Icon src={Spinner} size="small" /> : content;

  return content ? (
    <Injection target="$foreground">
      <div ref={setRef} className={styles.Container}>
        <div
          className={Class(
            styles.SnackBar,
            active && mounted && styles.Mounted
          )}
        >
          {ContentMarkup}
        </div>
      </div>
    </Injection>
  ) : null;
}
