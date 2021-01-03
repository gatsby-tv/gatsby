import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Stream, Flex } from "@gatsby-tv/components";
import { useBreakpoints, useTheme } from "@gatsby-tv/utilities";

import { SPRING_VIDEO, BLENDER_CHANNEL } from "@src/example";
import { Preview, PreviewProps } from "@src/components/Preview";

const ContentContainer = styled.div<{ groups: number }>`
  & > ${Flex} > ${Flex.Item} {
    flex-basis: ${(props) => `calc(${Math.floor(100 / props.groups)}% - 10px)`};
  }
`;

function ContentMarkup(props: PreviewProps) {
  const theme = useTheme();

  return (
    <Flex.Item $grow={1} $marginBottom={theme.spacing.tight}>
      <Preview {...props} />
    </Flex.Item>
  );
}

export function Grid(): React.ReactElement {
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

  return (
    <ContentContainer groups={groups}>
      <Stream
        $center
        $wrap="wrap"
        $gap={theme.spacing.baseLoose}
        $max={2}
        $source={ContentMarkup}
        $generator={useCallback(
          () =>
            [...Array(12)].map(() => ({
              video: SPRING_VIDEO,
              channel: BLENDER_CHANNEL,
            })),
          []
        )}
      />
    </ContentContainer>
  );
}
