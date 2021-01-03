import React, { useCallback } from "react";
import { Stream, Flex } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { SPRING_VIDEO, BLENDER_CHANNEL } from "@src/example";
import { Preview, PreviewProps } from "@src/components/Preview";

function ContentMarkup(props: PreviewProps) {
  return (
    <Flex.Item>
      <Preview compact {...props} />
    </Flex.Item>
  );
}

export function Column(): React.ReactElement {
  const theme = useTheme();

  return (
    <Stream
      $column
      $gap={theme.spacing.base}
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
  );
}
