import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Rule,
  Scroll,
  TextBox,
  Optional,
} from "@gatsby-tv/components";
import { Video, Topic, Genre } from "@gatsby-tv/types";
import {
  ifExists,
  useTheme,
  useStabilizedCallback,
} from "@gatsby-tv/utilities";

import { Info } from "./components/Info";
import { Engagement } from "./components/Engagement";
import { Credits } from "./components/Credits";
import { Category } from "./components/Category";

export interface DescriptionProps {
  video: Video;
  breakpoint: number;
}

export function Description(props: DescriptionProps) {
  const { video, breakpoint } = props;
  const [clamp, setClamp] = useState(true);
  const theme = useTheme();

  const toggleClamp = useStabilizedCallback(
    () => setClamp((current) => !current),
    [clamp]
  );

  const TextMarkup = (
    <TextBox font="basesmall" fontHeight="large" clamp={ifExists(clamp, 3)}>
      {video.description}
    </TextBox>
  );

  const ShowButtonMarkup = (
    <Box w="fit-content">
      <Button font="small" padding={theme.spacing.none} onClick={toggleClamp}>
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
          theme.spacing.none,
          theme.spacing.tight,
          theme.spacing.none,
          theme.spacing.none,
        ]}
      />
    ) : null;

  const CreditsMarkup =
    breakpoint === 3 ? (
      <Flex.Item shrink={0} minw="28rem">
        <Scroll>
          <Flex column gap={theme.spacing.base}>
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

  const CompactCreditsMarkup =
    breakpoint < 3 ? (
      <>
        <Credits compact channel={video.channel} />
        {!clamp && (
          <Flex gap={theme.spacing.baseloose}>
            <Credits compact collaborators={video.collaborators} />
            <Credits
              compact
              contributors={video.contributors}
              contributions={video.contributions}
            />
            <Credits compact sponsors={video.sponsors} />
          </Flex>
        )}
      </>
    ) : null;

  return (
    <>
      <Info
        title={video.title}
        views={video.views}
        releaseDate={video.releaseDate}
      />
      <Rule
        margin={[
          theme.spacing.tight,
          theme.spacing.none,
          theme.spacing.basetight,
        ]}
      />
      <Optional
        active={breakpoint === 3}
        component={Flex}
        $props={{ gap: theme.spacing.base }}
      >
        <Flex column gap={theme.spacing.base}>
          <Engagement breakpoint={breakpoint} />
          {CompactCreditsMarkup}
          {TextMarkup}
          {(breakpoint !== 0 || !clamp) && (
            <Category
              breakpoint={breakpoint}
              topic={video.topic}
              genre={video.genre}
            />
          )}
          {ShowButtonMarkup}
        </Flex>
        {CreditsMarkup}
      </Optional>
    </>
  );
}
