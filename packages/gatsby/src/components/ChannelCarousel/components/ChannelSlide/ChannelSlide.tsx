import React from "react";
import { Carousel, Image } from "@gatsby-tv/components";
import { Channel } from "@gatsby-tv/types";
import { useTheme, useModal } from "@gatsby-tv/utilities";

import { ChannelModal } from "@src/components/ChannelModal";

export interface ChannelSlideProps {
  channel: Channel;
}

export function ChannelSlide(props: ChannelSlideProps): React.ReactElement {
  const theme = useTheme();
  const { channel } = props;
  const { active, activate, deactivate } = useModal();

  const imageProps = {
    src: channel.poster,
    rounded: theme.border.radius.smallest,
    aspectRatio: 2,
  };

  return (
    <>
      <Carousel.Slide onClick={activate}>
        <Image {...imageProps} />
      </Carousel.Slide>
      <ChannelModal channel={channel} active={active} onExit={deactivate} />
    </>
  );
}
