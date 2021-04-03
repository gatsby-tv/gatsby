import React from "react";
import { Box, Optional, Grid, Flex, Rule, TextPlaceholder } from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";
import Preview, { PreviewFormat } from "@gatsby-tv/preview";

import { Info } from "@src/components/Info";
import { usePageMargin } from "@src/utilities/use-page-margin";

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
  const margin = usePageMargin();

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: ifExists(groups > 1),
    gap: theme.spacing[1.5],
  };

  const boxProps = {
    active: format === "column",
    $props: { margin },
  };

  const previewProps = {
    format,
    info: (
      <Optional component={Box} {...boxProps}>
        <Info.Skeleton content channel={!nochannel} avatar={avatar} />
      </Optional>
    ),
  };

  const PreviewsMarkup = [...Array(24)].map((_, index) => (
    <Grid.Item key={`skeleton.${index}`}>
      <Preview.Skeleton {...previewProps} />
    </Grid.Item>
  ));

  return (
    <Flex column gap={theme.spacing[1.5]}>
      <Rule />
      <Flex column gap={theme.spacing[1.5]}>
        <Box margin={margin}>
          <TextPlaceholder heading font={theme.font[2]} w={0.3} />
        </Box>
        <Grid {...gridProps}>{PreviewsMarkup}</Grid>
      </Flex>
    </Flex>
  );
}
