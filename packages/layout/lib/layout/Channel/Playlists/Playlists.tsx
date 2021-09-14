import { AriaAttributes, ReactElement } from 'react';
import { Stream } from '@gatsby-tv/components';
import { useChannelPlaylists } from '@gatsby-tv/services';
import { Class } from '@gatsby-tv/utilities';
import { Channel } from '@gatsby-tv/types';

import { Article } from '@lib/components/Article';
import { ListingContext, ListingContextType } from '@lib/utilities/listing';

import { Skeleton } from './Playlists.skeleton';
import styles from './Playlists.scss';

export interface PlaylistsProps
  extends Partial<Omit<ListingContextType, 'info' | 'avatar'>>,
    AriaAttributes {
  channel?: Channel;
}

export function Playlists(props: PlaylistsProps): ReactElement {
  const { id, channel, preview = 'column', link, ...aria } = props;

  const { playlists, loading, error, generator } = useChannelPlaylists(
    channel?._id
  );

  if (!playlists || error) return <Skeleton preview={preview} />;

  const classes = Class(styles.Listing, preview === 'column' && styles.Column);

  const StreamMarkup = playlists.length ? (
    <Stream
      component={Article}
      generator={generator}
      loading={loading}
      data={playlists.map((item, index) => ({ index, content: item }))}
    />
  ) : (
    <div className={styles.NoContentText}>{`${
      (channel as Channel).name
    } has not posted any playlists...`}</div>
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
