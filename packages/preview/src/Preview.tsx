import { ReactElement } from 'react';
import { Image, Optional, Labelled } from '@gatsby-tv/components';

import { Overlay } from '@src/components/Overlay';
import { Skeleton } from '@src/Preview.skeleton';
import { PreviewProps } from '@src/types';
import styles from '@src/Preview.scss';

export function Preview(props: PreviewProps): ReactElement {
  const {
    content,
    bookmark,
    format = 'column',
    info: Info,
    link: Link,
    ...aria
  } = props;

  if (!content) {
    return <Skeleton format={format} info={Info} />;
  }

  const InfoMarkup = Info ? (
    <Optional
      component="div"
      active={format !== 'column'}
      $props={{ className: styles[`Info-${format}`] }}
    >
      {Info}
    </Optional>
  ) : null;

  const LinkMarkup = Link ? <div className={styles.Link}>{Link}</div> : null;

  return (
    <Labelled
      component="article"
      $props={{
        className: styles[`Preview-${format}`],
        ...aria,
      }}
    >
      <Image
        src={content.thumbnail}
        rounded="smallest"
        aspectRatio="16 / 9"
        overlay={<Overlay content={content} bookmark={bookmark} />}
        draggable="false"
      />
      {InfoMarkup}
      {LinkMarkup}
    </Labelled>
  );
}
