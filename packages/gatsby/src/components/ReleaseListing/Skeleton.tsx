import React from "react";
import { Box, Grid, Flex, Rule, TextPlaceholder } from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { PreviewFormat } from "@src/types";
import { Preview } from "@src/components/Preview";

export interface SkeletonProps {
  groups: number;
  format?: PreviewFormat;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { groups, format = "default" } = props;
  const theme = useTheme();

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: ifExists(groups > 1),
    gap: theme.spacing[1.5],
  };

  const PreviewsMarkup = [...Array(24)].map((_, index) => (
    <Grid.Item key={`skeleton.${index}`}>
      <Preview.Skeleton format={format} avatar={theme.avatar.small} />
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
