import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Scroll,
  Rule,
  Panel,
  TextBox,
} from "@gatsby-tv/components";
import { Video } from "@gatsby-tv/types";
import { ifExists, useTheme, useModal } from "@gatsby-tv/utilities";

import { Info } from "./components/Info";
import { Engagement } from "./components/Engagement";
import { Credits } from "./components/Credits";
import { Category } from "./components/Category";

import { Skeleton } from "./Skeleton";

export interface DescriptionProps {
  video: Video;
}

function DescriptionBase(props: DescriptionProps) {
  const theme = useTheme();
  const { video } = props;
  const { active, activate, deactivate } = useModal();
  const [draggable, setDraggable] = useState(false);

  const panelProps = {
    active,
    draggable,
    fullscreen: true,
    onExit: deactivate,
  };

  const panelFlexProps = {
    column: true,
    gap: theme.spacing[1],
    padding: theme.spacing[1.5],
    bg: theme.colors.background[3],
  };

  const onScroll = useCallback(
    (event: any) => setDraggable(event.target.scrollTop === 0),
    []
  );

  const CreditsMarkup = (
    <Flex column gap={theme.spacing[2]}>
      <Credits collaborators={video.collaborators} />
      <Credits
        contributors={video.contributors}
        contributions={video.contributions}
      />
      <Credits sponsors={video.sponsors} />
    </Flex>
  );

  return (
    <>
      <Flex column gap={theme.spacing[1]}>
        <Button unstyled onClick={activate}>
          <Info video={video} />
        </Button>
        <Engagement />
        <Rule />
        <Credits channel={video.channel} />
        <Rule />
      </Flex>
      <Panel direction="bottom" {...panelProps}>
        <Box absolute expand shadow top={0.4}>
          <Scroll hide onScroll={onScroll}>
            <Flex {...panelFlexProps}>
              {CreditsMarkup}
              <TextBox font={theme.font[4]}>{video.description}</TextBox>
              <Category topic={video.topic} genre={video.genre} />
            </Flex>
          </Scroll>
        </Box>
      </Panel>
    </>
  );
}

export const Description = Object.assign(DescriptionBase, {
  Skeleton,
  displayName: "Description",
});
