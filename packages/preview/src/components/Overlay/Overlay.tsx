import { ReactElement } from 'react';
import { Browsable, VideoBookmark } from '@gatsby-tv/types';

import { Duration } from '@src/components/Duration';

import styles from '@src/Preview.scss';

export interface OverlayProps {
  content: Browsable;
  bookmark?: VideoBookmark;
}

export function Overlay(props: OverlayProps): ReactElement {
  const { content, bookmark } = props;

  const TimelineMarkup = bookmark ? (
    <div className={styles.Timeline}>
      <div
        style={{ right: `${100 * (1 - bookmark.timestamp)}%` }}
        className={styles.TimelineProgress}
      />
    </div>
  ) : null;

  return (
    <>
      <Duration content={content} />
      {TimelineMarkup}
    </>
  );
}
