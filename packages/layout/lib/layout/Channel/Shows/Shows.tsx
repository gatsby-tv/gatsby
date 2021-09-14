import { AriaAttributes, ReactElement } from 'react';
import { Stream } from '@gatsby-tv/components';
import { useChannelShows } from '@gatsby-tv/services';
import { Class } from '@gatsby-tv/utilities';
import { Channel } from '@gatsby-tv/types';

import { Article } from '@lib/components/Article';
import { ListingContext, ListingContextType } from '@lib/utilities/listing';

import { Skeleton } from './Shows.skeleton';
import styles from './Shows.scss';

export interface ShowsProps
  extends Partial<Omit<ListingContextType, 'info' | 'avatar'>>,
    AriaAttributes {
  channel?: Channel;
}

export function Shows(props: ShowsProps): ReactElement {
  const { id, channel, preview = 'column', link, ...aria } = props;

  const { shows, loading, error, generator } = useChannelShows(channel?._id);

  if (!shows || error) return <Skeleton preview={preview} />;

  const classes = Class(styles.Listing, preview === 'column' && styles.Column);

  const StreamMarkup = shows.length ? (
    <Stream
      component={Article}
      generator={generator}
      loading={loading}
      data={shows.map((item, index) => ({ index, content: item }))}
    />
  ) : (
    <div className={styles.NoContentText}>{`${
      (channel as Channel).name
    } has not posted any shows...`}</div>
  );

  return (
    <ListingContext.Provider value={{ id, preview, info: 'nochannel', link }}>
      <section
        id={id}
        className={classes}
        role="feed"
        aria-busy={loading}
        {...aria}
      >
        {StreamMarkup}
      </section>
    </ListingContext.Provider>
  );
}
