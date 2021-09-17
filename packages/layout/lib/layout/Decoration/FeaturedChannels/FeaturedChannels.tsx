import { ReactElement } from 'react';
import { Carousel, Image } from '@gatsby-tv/components';
import { useFeaturedChannels } from '@gatsby-tv/services';
import { useBreakpoints } from '@gatsby-tv/utilities';
import { Channel } from '@gatsby-tv/types';

import { Skeleton } from './FeaturedChannels.skeleton';

export interface FeaturedChannelsProps {
  onSelect: (channel: Channel) => void;
}

export function FeaturedChannels(
  props: FeaturedChannelsProps
): ReactElement | null {
  const { onSelect } = props;
  const { channels } = useFeaturedChannels();

  const groups = useBreakpoints({
    3: '(max-width: 650px)',
    4: '(min-width: 650px) and (max-width: 950px)',
    5: '(min-width: 950px) and (max-width: 1200px)',
    6: '(min-width: 1200px) and (max-width: 1600px)',
    7: '(min-width: 1600px)',
  });

  if (!groups) return null;
  if (!channels) return <Skeleton groups={groups} />;

  const ChannelsMarkup = channels.map((channel, index) => (
    <Carousel.Slide
      key={`Channel.${channel._id}.${index}`}
      onClick={() => onSelect(channel)}
    >
      <Image
        src={channel.poster}
        rounded="smallest"
        aspectRatio="1 / 2"
        draggable="false"
      />
    </Carousel.Slide>
  ));

  return <Carousel groups={groups}>{ChannelsMarkup}</Carousel>;
}
