import React from "react";
import { Box, Grid, Flex, Rule, TextPlaceholder } from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";
import Preview, { PreviewFormat } from "@gatsby-tv/preview";

import { Info } from "@src/components/Info";

export interface SkeletonProps {
  groups: number;
  format?: PreviewFormat;
  nochannel?: boolean;
  avatar?: string;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const theme = useTheme();
  const {
    groups,
    format = "column",
    nochannel,
    avatar,
  } = props;

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: ifExists(groups > 1),
    gap: theme.spacing[1.5],
  };

  const previewProps = {
    format,
    info: <Info.Skeleton content channel={!nochannel} avatar={avatar} />,
  };

  const PreviewsMarkup = [...Array(24)].map((_, index) => (
    <Grid.Item key={`skeleton.${index}`}>
      <Preview.Skeleton {...previewProps} />
    </Grid.Item>
  ));

  return (
    <Flex column gap={theme.spacing[3]}>
      <Rule />
      <Flex column gap={theme.spacing[1.5]}>
        <Box marginBottom="2px">
          <TextPlaceholder heading font={theme.font[2]} w={0.1} />
        </Box>
        <Grid {...gridProps}>{PreviewsMarkup}</Grid>
      </Flex>
    </Flex>
  );
}
