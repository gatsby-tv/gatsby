import { AriaAttributes, ReactElement } from 'react';
import { Stream } from '@gatsby-tv/components';
import { useRelatedFeed } from '@gatsby-tv/services';
import { Video } from '@gatsby-tv/types';

import { Article } from '@lib/components/Article';
import { ListingContext, ListingContextType } from '@lib/utilities/listing';

import { Skeleton } from './Related.skeleton';
import styles from './Related.scss';

export interface RelatedProps
  extends Partial<ListingContextType>,
    AriaAttributes {
  content?: Video;
}

export function Related(props: RelatedProps): ReactElement {
  const {
    id,
    content,
    preview = 'row',
    info = 'full',
    avatar,
    link,
    ...aria
  } = props;

  const { content: related, loading, error, generator } = useRelatedFeed(content?._id);

  if (!related || error)
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
          data={related.map((item, index) => ({ index, content: item }))}
        />
      </section>
    </ListingContext.Provider>
  );
}
