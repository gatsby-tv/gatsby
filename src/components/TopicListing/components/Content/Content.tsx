import React from "react";
import { Flex } from "@gatsby-tv/components";

import { TopicPreview, TopicPreviewProps } from "@src/components/TopicPreview";

export type ContentProps = TopicPreviewProps;

export function Content(props: ContentProps): React.ReactElement {
  return (
    <Flex.Item>
      <TopicPreview {...props} />
    </Flex.Item>
  );
}
