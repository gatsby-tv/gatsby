import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Rule,
  Scroll,
  TextBox,
} from "@gatsby-tv/components";
import { Video } from "@gatsby-tv/types";
import {
  ifExists,
  useTheme,
  useStabilizedCallback,
} from "@gatsby-tv/utilities";

import { Info } from "./components/Info";
import { Engagement } from "./components/Engagement";
import { Credits } from "./components/Credits";
import { Category } from "./components/Category";
import { Skeleton } from "./components/Skeleton";

export interface DescriptionProps {
  video: Video;
  compact?: boolean;
}

function DescriptionBase(props: DescriptionProps) {
  const theme = useTheme();
  const { video, compact } = props;
  const [clamp, setClamp] = useState(true);

  const toggleClamp = useStabilizedCallback(
    () => setClamp((current) => !current),
    [clamp]
  );

  const TextMarkup = (
    <TextBox font={theme.font[4]} clamp={ifExists(clamp, 3)}>
      {video.description}
    </TextBox>
  );

  const ShowButtonMarkup = (
    <Box w="fit-content">
      <Button
        font={theme.font[6]}
        padding={theme.spacing[0]}
        onClick={toggleClamp}
      >
        {clamp ? "Show More" : "Show Less"}
      </Button>
    </Box>
  );

  const CreditsDividerMarkup =
    video.collaborators.length ||
    video.contributors.length ||
    video.sponsors.length ? (
      <Rule
        thin
        margin={[
          theme.spacing[0],
          theme.spacing[1],
          theme.spacing[0],
          theme.spacing[0],
        ]}
      />
    ) : null;

  const CreditsMarkup = !compact ? (
    <Flex.Item shrink={0} minw="30rem">
      <Scroll>
        <Flex column gap={theme.spacing[1.5]}>
          <Credits channel={video.channel} />
          {CreditsDividerMarkup}
          <Credits collaborators={video.collaborators} />
          <Credits
            contributors={video.contributors}
            contributions={video.contributions}
          />
          <Credits sponsors={video.sponsors} />
        </Flex>
      </Scroll>
    </Flex.Item>
  ) : null;

  const CreditsCompactHiddenMarkup = !clamp ? (
    <Flex gap={theme.spacing[2]}>
      <Credits compact collaborators={video.collaborators} />
      <Credits
        compact
        contributors={video.contributors}
        contributions={video.contributions}
      />
      <Credits compact sponsors={video.sponsors} />
    </Flex>
  ) : null;

  const CreditsCompactMarkup = compact ? (
    <>
      <Credits compact channel={video.channel} />
      {CreditsCompactHiddenMarkup}
    </>
  ) : null;

  return (
    <>
      <Flex justify="space-between">
        <Info video={video} />
        <Engagement />
      </Flex>
      <Rule margin={[theme.spacing[1], theme.spacing[0], theme.spacing[1.5]]} />
      <Flex>
        <Flex column gap={theme.spacing[1.5]}>
          {CreditsCompactMarkup}
          {TextMarkup}
          <Category topic={video.topic} genre={video.genre} />
          {ShowButtonMarkup}
        </Flex>
        {CreditsMarkup}
      </Flex>
    </>
  );
}

export const Description = Object.assign(DescriptionBase, {
  Skeleton,
  displayName: "Description",
});
