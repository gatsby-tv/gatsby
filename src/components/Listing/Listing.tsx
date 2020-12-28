import React, { useState, useRef, useEffect } from "react";
import { Stream, Flex } from "@gatsby-tv/components";
import { useBreakpoints, useTheme } from "@gatsby-tv/utilities";

import { Preview, PreviewProps } from "@src/components/Preview";

const SPRING_EXAMPLE_DATA = {
  thumbnail: "/ipfs/QmTane4wbW44u6pR5rCsrQAV8TmBAnQvC4N5tGBwSQK1Wz",
  avatar: "/ipfs/QmeERq8yXYZcKVnoHdZ9Tpri3meDKB85y7T4ksozSKXiSW",
  title: "Spring - Blender Open Movie",
  channel: "Blender Animation Studio",
  views: "6M views",
  age: "1 year ago",
  duration: 465,
};

export interface ListingProps {}

export function Listing(props: ListingProps) {
  const theme = useTheme();
  const [groups, setGroups] = useState(3);
  const breakpoint = useBreakpoints({
    small: "(max-width: 768px)",
    medium: "(min-width: 768px) and (max-width: 1200px)",
    large: "(min-width: 1200px)",
  });

  useEffect(() => {
    switch (breakpoint) {
      case "small":
        setGroups(1);
        return;
      case "medium":
        setGroups(2);
        return;
      case "large":
        setGroups(3);
        return;
    }
  }, [breakpoint]);

  const ContentMarkup = (props: PreviewProps) => (
    <Flex.Item $grow={1} $basis={`calc(${Math.floor(100 / groups)}% - 10px)`}>
      <Preview {...props} />
    </Flex.Item>
  );

  return (
    <Stream
      $center
      $wrap="wrap"
      $gap={theme.spacing.loose}
      $source={ContentMarkup}
      $generator={() => [...Array(12)].map(() => SPRING_EXAMPLE_DATA)}
    />
  );
}
