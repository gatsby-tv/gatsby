import React, { AriaAttributes } from 'react';
import { Stream } from '@gatsby-tv/components';
import { Class } from '@gatsby-tv/utilities';
import { Channel } from '@gatsby-tv/types';

import { Article } from '@lib/listing/components/Article';
import { ListingContext, ListingContextType } from '@lib/utilities/listing';
import { useChannelVideos } from '@lib/utilities/use-channel-videos';

import { Skeleton } from './Videos.skeleton';
import styles from './Videos.scss';

export interface VideosProps
  extends Partial<Omit<ListingContextType, 'info' | 'avatar'>>,
    AriaAttributes {
  channel?: Channel;
}

export function Videos(props: VideosProps): React.ReactElement {
  const { id, channel, preview = 'column', link, ...aria } = props;

  const { videos, loading, error, generator } = useChannelVideos(channel?._id);

  if (!videos || error) return <Skeleton preview={preview} />;

  const classes = Class(
    styles.Listing,
    preview === 'column' && styles.Column
  );

  const StreamMarkup = videos.length ? (
    <Stream
      component={Article}
      generator={generator}
      loading={loading}
      data={videos.map((item, index) => ({ index, content: item }))}
    />
  ) : (
    <div className={styles.NoContentText}>{`${
      (channel as Channel).name
    } has not posted any videos...`}</div>
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
