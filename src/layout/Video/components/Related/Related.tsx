import { ReactElement } from 'react';
import { Video } from '@gatsby-tv/content';
import { useFrame } from '@gatsby-tv/utilities';
import { Video as VideoType } from '@gatsby-tv/types';

import { Link } from '@src/components/Link';

import styles from './Related.module.scss';

export interface RelatedProps {
  video?: VideoType;
}

export function Related(props: RelatedProps): ReactElement {
  const { video } = props;
  const { screen } = useFrame();

  const tight = screen.width < 650;

  return (
    <div className={styles.Related}>
      <Video.Related
        video={video}
        preview={tight ? 'column' : 'row'}
        avatar={tight ? 'small' : undefined}
        link={Link.Content}
      />
    </div>
  );
}
