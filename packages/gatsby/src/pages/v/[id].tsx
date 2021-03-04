import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Flex, Player } from "@gatsby-tv/components";
import {
  useTheme,
  useScroll,
  useIPFSVideoStream,
  useBreakpoints,
  useFrame,
} from "@gatsby-tv/utilities";

import { PageBody } from "@src/components/PageBody";
import { Listing } from "@src/components/Listing";
import { Description } from "@src/components/Description";
import { useRelatedFeed } from "@src/utilities/use-related-feed";
import { useVideo } from "@src/utilities/use-video";

export default function VideoPage(): React.ReactElement {
  const theme = useTheme();
  const router = useRouter();
  const id = [router.query.id].flat()[0];
  const { fullscreen, toggleFullscreen } = useFrame();
  const { setScroll } = useScroll();
  const { video } = useVideo(id);
  const { content, ...related } = useRelatedFeed(id);
  const player = useIPFSVideoStream([video?.content].flat()[0]);

  const compact = useBreakpoints(
    {
      1: "(max-width: 1350px)",
      0: "(min-width: 1351px)",
    },
    1
  );

  useEffect(() => setScroll(0), []);

  useEffect(() => {
    if (fullscreen) {
      setScroll(0);
    }
  }, [fullscreen]);

  const playerProps = {
    ref: player,
    muted: true,
    fullscreen,
    toggleFullscreen,
  };

  const leftItemProps = {
    basis: 0.65,
    shrink: 2,
    grow: 2,
    paddingRight: theme.spacing[3],
  };

  const rightItemProps = {
    minw: "45rem",
    basis: 0.35,
    shrink: 1,
    grow: 1,
    marginTop: theme.spacing[0.5],
  };

  const HeaderMarkup = (
    <Head>
      <title>{video ? `${video.title} - Gatsby` : null}</title>
    </Head>
  );

  const DescriptionMarkup = video ? (
    <Description video={video} compact={Boolean(compact)} />
  ) : (
    <Description.Skeleton />
  );

  const ListingMarkup = content ? (
    <Listing format="compact" content={content} {...related} />
  ) : (
    <Listing.Skeleton format="compact" />
  );

  return (
    <>
      {HeaderMarkup}
      <Player {...playerProps} />
      <PageBody tight>
        <Flex>
          <Flex.Item {...leftItemProps}>{DescriptionMarkup}</Flex.Item>
          <Flex.Item {...rightItemProps}>{ListingMarkup}</Flex.Item>
        </Flex>
      </PageBody>
    </>
  );
}
