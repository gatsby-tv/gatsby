import React from "react";
import { Carousel as CarouselComponent, Image } from "@gatsby-tv/components";
import { useBreakpoints } from "@gatsby-tv/utilities";
import { Channel } from "@gatsby-tv/types";

import { useFeaturedChannels } from "@lib/utilities/use-featured-channels";

import { Skeleton } from "./Carousel.skeleton";
import styles from "./Carousel.scss";

export interface CarouselProps {
  onSelect: (channel: Channel) => void;
}

export function Carousel(props: CarouselProps): React.ReactElement | null {
  const { onSelect } = props;
  const { channels } = useFeaturedChannels();

  const groups = useBreakpoints({
    3: "(max-width: 650px)",
    4: "(min-width: 650px) and (max-width: 1100px)",
    5: "(min-width: 1100px) and (max-width: 1300px)",
    6: "(min-width: 1300px) and (max-width: 1600px)",
    7: "(min-width: 1600px)",
  });

  if (!groups) return null;
  if (!channels) return <Skeleton groups={groups} />;

  const ChannelsMarkup = channels.map((channel, index) => (
    <CarouselComponent.Slide
      key={`Channel.${channel._id}.${index}`}
      onClick={() => onSelect(channel)}
    >
      <Image src={channel.poster} rounded="smallest" aspectRatio={2} />
    </CarouselComponent.Slide>
  ));

  return (
    <CarouselComponent groups={groups}>{ChannelsMarkup}</CarouselComponent>
  );
}
