import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Transfer } from "@gatsby-tv/icons";
import {
  FullValue,
  FullAge,
  Value,
  useTheme,
  useIPFSPeers,
  useIPFSVideoStream,
} from "@gatsby-tv/utilities";
import {
  Box,
  Button,
  Flex,
  Icon,
  Player,
  Rule,
  TextBox,
  TextHeading,
  TextMeta,
} from "@gatsby-tv/components";
import { Subscribe, Promote, Donate, Tip, Misc } from "@gatsby-tv/icons";

import {
  SPRING_VIDEO,
  SPRING_VIDEO_SOURCE /* BLENDER_CHANNEL */,
} from "@src/example";
import { Layout } from "@src/components/Layout";
import { Listing } from "@src/components/Listing";
import { EngagementButton } from "@src/components/EngagementButton";
import { CategoryTag } from "@src/components/CategoryTag";

export default function Video(): React.ReactElement {
  const theme = useTheme();
  const router = useRouter();
  const { hash } = router.query;
  const { peers } = useIPFSPeers();

  const video = SPRING_VIDEO;
  //const channel = BLENDER_CHANNEL;

  const player = useIPFSVideoStream(video.hash);

  const infoMarkup = (
    <Flex $width={1} $column $gap={theme.spacing.tight}>
      <TextMeta $bold $size="large">
        {video.title}
      </TextMeta>
      <Flex $justify="space-between">
        <Flex.Item>
          <TextMeta.List $subdued>
            <TextMeta>{FullValue(video.views, "view")}</TextMeta>
            <TextMeta>{FullAge(video.age)}</TextMeta>
          </TextMeta.List>
        </Flex.Item>
        <Flex.Item>
          <TextMeta $subdued>
            <Flex $gap={theme.spacing.extraTight}>
              <Icon $source={Transfer} $width={theme.icon.small} />
              {Value(peers.length, "peer")}
            </Flex>
          </TextMeta>
        </Flex.Item>
      </Flex>
    </Flex>
  );

  const listingMarkup = (
    <>
      <TextBox $marginBottom={theme.spacing.baseTight}>
        <TextHeading>Related</TextHeading>
      </TextBox>
      <Listing column />
    </>
  );

  const engagementMarkup = (
    <Flex $gap={theme.spacing.base}>
      <EngagementButton source={Subscribe} />
      <EngagementButton source={Promote} />
      <EngagementButton source={Donate} />
      <EngagementButton source={Tip} />
      <EngagementButton source={Misc} />
    </Flex>
  );

  return (
    <Layout>
      <Box $margin="0 -52px">
        <Player
          ref={player}
          $video={{
            muted: true,
          }}
        />
      </Box>
      <Flex $marginTop={theme.spacing.base}>
        <Flex.Item
          $paddingRight={theme.spacing.loose}
          $basis={0.65}
          $shrink={2}
          $grow={2}
        >
          <Flex>{infoMarkup}</Flex>
          <Rule $margin={theme.spacing.tight} />
          <Flex $paddingTop={theme.spacing.tight}>
            <Flex.Item>
              {engagementMarkup}
              <TextBox
                $marginTop={theme.spacing.base}
                $size="baseSmall"
                $fontHeight="large"
                $clamp={3}
              >
                {video.description}
              </TextBox>
              <Flex $marginTop={theme.spacing.base} $gap={theme.spacing.base}>
                <CategoryTag type="topic" title={video.topic} />
                <CategoryTag type="genre" title={video.genre} />
              </Flex>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex.Item $minWidth="45rem" $basis={0.35} $shrink={1} $grow={1}>
          {listingMarkup}
        </Flex.Item>
      </Flex>
    </Layout>
  );
}
