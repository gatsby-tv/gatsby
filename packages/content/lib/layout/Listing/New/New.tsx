import { AriaAttributes, ReactElement } from 'react';
import { Stream } from '@gatsby-tv/components';
import { Class } from '@gatsby-tv/utilities';
import { Browsable } from '@gatsby-tv/types';

import { Article } from '@lib/layout/Listing/components/Article';
import { useNewFeed } from '@lib/services/use-new-feed';
import { ListingContext, ListingContextType } from '@lib/utilities/listing';

import { Skeleton } from './New.skeleton';
import styles from './New.scss';

export type NewProps = Partial<ListingContextType> & AriaAttributes;

export function New(props: NewProps): ReactElement {
  const {
    id,
    preview = 'column',
    info = 'full',
    avatar,
    link,
    ...aria
  } = props;

  const { content, loading, error, generator } = useNewFeed();

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
