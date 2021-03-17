import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Player from "@gatsby-tv/player";
import { Box, Flex } from "@gatsby-tv/components";
import {
  useTheme,
  useScroll,
  useIPFSVideoStream,
  useFrame,
} from "@gatsby-tv/utilities";
import { useVideo, useRelatedFeed } from "@gatsby-tv/next";

import { PageBody } from "@src/components/PageBody";
import { Listing } from "@src/components/Listing";
import { Description } from "@src/components/Description";

export default function VideoPage(): React.ReactElement {
  const theme = useTheme();
  const router = useRouter();
  const id = [router.query.id].flat()[0];
  const { screen, fullscreen, setFullscreen } = useFrame();
  const { setScroll } = useScroll();
  const { video } = useVideo(id);
  const { content, ...related } = useRelatedFeed(id);
  const player = useIPFSVideoStream([video?.content].flat()[0]);

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
    setFullscreen,
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
    <Description video={video} compact={screen.width < 1350} />
  ) : (
    <Description.Skeleton />
  );

  const ListingMarkup = content ? (
    <Listing format="row" content={content} {...related} />
  ) : (
    <Listing.Skeleton format="row" />
  );

  return (
    <>
      {HeaderMarkup}
      <Player.Desktop {...playerProps} />
      <PageBody tight>
        <Flex>
          <Flex.Item {...leftItemProps}>{DescriptionMarkup}</Flex.Item>
          <Flex.Item {...rightItemProps}>{ListingMarkup}</Flex.Item>
        </Flex>
      </PageBody>
    </>
  );
}
