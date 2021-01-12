import React, { useState } from "react";
import { Box, Button, Flex, Rule, TextBox, Optional } from "@gatsby-tv/components";
import { Video, Topic, Genre } from "@gatsby-tv/types";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { Info } from "./components/Info";
import { Engagement } from "./components/Engagement";
import { Credits } from "./components/Credits";
import { CategoryLink } from "./components/CategoryLink";

export interface DescriptionProps {
  video: Video;
}

export function Description(props: DescriptionProps) {
  const { video } = props;
  const [clamp, setClamp] = useState(true);
  const theme = useTheme();

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
          theme.spacing.baseTight,
        ]}
      />
      <Flex gap={theme.spacing.base}>
        <Flex.Item>
          <Flex column gap={theme.spacing.base}>
            <Engagement />
            <TextBox font="baseSmall" fontHeight="large" clamp={ifExists(clamp, 3)}>
              {video.description}
            </TextBox>
            <Optional
              active={ifExists(video.topic && video.genre)}
              component={Flex}
              $props={{ gap: theme.spacing.base }}
            >
              {video.topic && <CategoryLink topic={video.topic} href="/" />}
              {video.genre && <CategoryLink genre={video.genre} href="/" />}
            </Optional>
            <Box w="fit-content">
              <Button
                font="small"
                padding={theme.spacing.none}
                onClick={() => setClamp((current) => !current)}
              >
                {clamp ? "Show More" : "Show Less"}
              </Button>
            </Box>
          </Flex>
        </Flex.Item>
        <Flex.Item shrink={0} basis={0.25}>
          <Credits
            channel={video.channel}
            collaborators={video.collaborators}
            contributors={video.contributors}
            contributions={video.contributions}
            sponsors={video.sponsors}
          />
        </Flex.Item>
      </Flex>
    </>
  );
}
