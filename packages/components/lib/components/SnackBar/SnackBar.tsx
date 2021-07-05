import React, { useState, useEffect } from 'react';
import { Spinner } from '@gatsby-tv/icons';
import { classNames, useSnackBarState } from '@gatsby-tv/utilities';

import { Injection } from '@lib/components/Injection';
import { Icon } from '@lib/components/Icon';

import styles from './SnackBar.scss';

export function SnackBar(): React.ReactElement | null {
  const { content, active } = useSnackBarState();
  const [mounted, setMounted] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref?.offsetHeight) {
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
  }, [ref]);

  useEffect(() => {
    if (!content) setMounted(false);
  }, [content]);

  const ContentMarkup =
    content instanceof Promise ? <Icon src={Spinner} size="small" /> : content;

  return content ? (
    <Injection target="$foreground">
      <div ref={setRef} className={styles.Container}>
        <div
          className={classNames(
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
