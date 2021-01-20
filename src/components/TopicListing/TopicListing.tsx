import React from "react";
import { Stream } from "@gatsby-tv/components";
import { useTheme, useFrame } from "@gatsby-tv/utilities";

import { Content, ContentProps } from "./components/Content";

export type TopicListingContentProps = ContentProps;
export type TopicListingGenerator = () => TopicListingContentProps[];

export interface TopicListingProps {
  generator: TopicListingGenerator;
}

export function TopicListing(props: TopicListingProps): React.ReactElement {
  const theme = useTheme();
  const { screen } = useFrame();

  return (
    <Stream
      column
      gap={screen === "desktop" ? theme.spacing.basetight : theme.spacing.tight}
      max={20}
      component={Content}
      generator={props.generator}
    />
  );
}
