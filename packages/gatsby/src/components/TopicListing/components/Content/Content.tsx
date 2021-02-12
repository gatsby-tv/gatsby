import React from "react";
import { Flex } from "@gatsby-tv/components";
import { TopicBrowsable } from "@gatsby-tv/types";

import { useListing } from "@src/utilities/listing";
import { PreviewSlider } from "@src/components/PreviewSlider";

export type ContentProps = TopicBrowsable;

export function Content(props: ContentProps): React.ReactElement {
  const { topic, content } = props;
  const { groups } = useListing();

  const sliderProps = {
    thin: true,
    href: `/d/topic/${topic}`,
    title: topic,
    groups,
    content,
  };

  return (
    <Flex.Item>
      <PreviewSlider {...sliderProps} />
    </Flex.Item>
  );
}
