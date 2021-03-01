import React from "react";
import { Carousel } from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { useTheme } from "@gatsby-tv/utilities";

import { ChannelSlide } from "./components/ChannelSlide";
import { Skeleton, SkeletonProps } from "./Skeleton";

export type { SkeletonProps as ChannelCarouselSkeletonProps };

export interface ChannelCarouselProps {
  groups: number;
  channels: Channel[];
}

function ChannelCarouselBase(props: ChannelCarouselProps): React.ReactElement {
  const { groups, channels } = props;
  const theme = useTheme();

  const SlidesMarkup = channels.map((channel, index) => (
    <ChannelSlide key={`${channel._id}.${index}`} channel={channel} />
  ));

  return (
    <Carousel groups={groups} gap={theme.spacing[1]}>
      {SlidesMarkup}
    </Carousel>
  );
}

export const ChannelCarousel = Object.assign(ChannelCarouselBase, {
  Skeleton,
  displayName: "ChannelCarousel",
});
