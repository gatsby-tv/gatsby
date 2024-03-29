import { AriaAttributes, ReactElement } from 'react';
import { Stream } from '@gatsby-tv/components';
import { useRecommendedFeed } from '@gatsby-tv/services';
import { Class } from '@gatsby-tv/utilities';
import { User } from '@gatsby-tv/types';

import { Article } from '@lib/components/Article';
import { ListingContext, ListingContextType } from '@lib/utilities/listing';

import { Skeleton } from './Recommended.skeleton';
import styles from './Recommended.scss';

export interface RecommendedProps
  extends Partial<ListingContextType>,
    AriaAttributes {
  user?: User;
}

export function Recommended(props: RecommendedProps): ReactElement {
  const {
    id,
    user,
    preview = 'column',
    info = 'full',
    avatar,
    link,
    ...aria
  } = props;

  const { content, loading, error, generator } = useRecommendedFeed(user?._id);

  if (!content || error)
    return <Skeleton preview={preview} info={info} avatar={avatar} />;

  const classes = Class(styles.Listing, preview === 'column' && styles.Column);

  return (
    <ListingContext.Provider value={{ id, preview, info, avatar, link }}>
      <section
        id={id}
        className={classes}
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
