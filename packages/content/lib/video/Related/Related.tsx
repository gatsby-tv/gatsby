import { AriaAttributes, ReactElement } from 'react';
import { Stream } from '@gatsby-tv/components';
import { Video } from '@gatsby-tv/types';

import { Article } from '@lib/listing/components/Article';
import { ListingContext, ListingContextType } from '@lib/utilities/listing';
import { useRelatedFeed } from '@lib/utilities/use-related-feed';

import { Skeleton } from './Related.skeleton';
import styles from './Related.scss';

export interface RelatedProps
  extends Partial<ListingContextType>,
    AriaAttributes {
  video?: Video;
}

export function Related(props: RelatedProps): ReactElement {
  const {
    id,
    video,
    preview = 'row',
    info = 'full',
    avatar,
    link,
    ...aria
  } = props;

  const { content, loading, error, generator } = useRelatedFeed(video?._id);

  if (!content || error)
    return <Skeleton preview={preview} info={info} avatar={avatar} />;

  return (
    <ListingContext.Provider value={{ id, preview, info, avatar, link }}>
      <section
        id={id}
        className={styles.Listing}
        role="feed"
        aria-busy={loading}
        {...aria}
      >
        <Stream
          component={Article}
          generator={generator}
          loading={loading}
          data={content.map((item, index) => ({ index, content: item }))}
        />
      </section>
    </ListingContext.Provider>
  );
}
