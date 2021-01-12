import React from "react";
import { useRouter } from "next/router";
import { Box, Flex, Player, TextHeading, TextBox } from "@gatsby-tv/components";
import { useTheme, useIPFSVideoStream } from "@gatsby-tv/utilities";

import { Listing } from "@src/components/Listing";
import { Description } from "@src/components/Description";
import { useRelatedFeed } from "@src/utilities/feeds";
import { useVideo } from "@src/utilities/use-video";

export default function VideoPage(): React.ReactElement {
  const theme = useTheme();
  const router = useRouter();
  const player = useIPFSVideoStream(router.query.hash);
  const video = useVideo(router.query.hash);
  const feed = useRelatedFeed();

  return (
    <>
      <Box margin={["-2px", "-50px", theme.spacing.none]}>
        <Player ref={player} video={{ muted: true }} />
      </Box>
      <Flex marginTop={theme.spacing.base}>
        <Flex.Item
          paddingRight={theme.spacing.loose}
          basis={0.65}
          shrink={2}
          grow={2}
        >
          <Description video={video} />
        </Flex.Item>
        <Flex.Item
          minw="45rem"
          basis={0.35}
          shrink={1}
          grow={1}
          marginTop={theme.spacing.extraTight}
        >
          <Listing generator={feed} />
        </Flex.Item>
      </Flex>
    </>
  );
}
