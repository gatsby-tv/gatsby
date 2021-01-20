import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Player,
  TextHeading,
  TextBox,
  Rule,
} from "@gatsby-tv/components";
import {
  ifExists,
  useTheme,
  useBreakpoints,
  useIPFSVideoStream,
} from "@gatsby-tv/utilities";

import { Listing } from "@src/components/Listing";
import { Description } from "@src/components/Description";
import { useRelatedFeed } from "@src/utilities/feeds";
import { usePageMargin } from "@src/utilities/use-page-margin";
import { useVideo } from "@src/utilities/use-video";

export default function VideoPage(): React.ReactElement {
  const theme = useTheme();
  const router = useRouter();
  const player = useIPFSVideoStream(router.query.hash as string);
  const video = useVideo(router.query.hash as string);
  const feed = useRelatedFeed();
  const margin = usePageMargin();
  const breakpoint = useBreakpoints({
    0: "(max-width: 620px)",
    1: "(min-width: 620px) and (max-width: 1100px)",
    2: "(min-width: 1100px) and (max-width: 1450px)",
    3: "(min-width: 1450px)",
  }) as number;

  return (
    <>
      <Player ref={player} video={{ muted: true }} />
      <Flex
        column={breakpoint < 2}
        margin={[theme.spacing.base, margin, theme.spacing.none]}
        gap={breakpoint < 2 ? theme.spacing.base : theme.spacing.none}
      >
        <Flex.Item
          paddingRight={ifExists(breakpoint >= 2, theme.spacing.loose)}
          basis={ifExists(breakpoint >= 2, 0.65)}
          shrink={2}
          grow={2}
        >
          <Description video={video} breakpoint={breakpoint} />
          {breakpoint < 2 && (
            <Rule
              margin={[
                theme.spacing.base,
                theme.spacing.none,
                theme.spacing.none,
              ]}
            />
          )}
        </Flex.Item>
        <Flex.Item
          minw={ifExists(breakpoint >= 2, "45rem")}
          basis={ifExists(breakpoint >= 2, 0.35)}
          shrink={1}
          grow={1}
          marginTop={theme.spacing.extratight}
        >
          <Listing generator={feed} />
        </Flex.Item>
      </Flex>
    </>
  );
}
