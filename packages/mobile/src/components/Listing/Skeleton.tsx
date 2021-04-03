import React from "react";
import { Grid, Optional, Box } from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";
import { Link } from "@gatsby-tv/next";
import Preview, { PreviewFormat } from "@gatsby-tv/preview";

import { Info } from "@src/components/Info";
import { usePageMargin } from "@src/utilities/use-page-margin";

export interface SkeletonProps {
  groups?: number;
  format?: PreviewFormat;
  nochannel?: boolean;
  avatar?: string;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const theme = useTheme();
  const {
    groups = 1,
    format = "column",
    nochannel,
    avatar,
  } = props;
  const margin = usePageMargin();

  const boxProps = {
    active: format === "column",
    $props: { margin },
  };

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: groups > 1,
    gap: theme.spacing[1.5],
  };

  const InfoMarkup = (
    <Optional component={Box} {...boxProps}>
      <Info.Skeleton content channel={!nochannel} avatar={avatar} />
    </Optional>
  );

  const ItemsMarkup = [...Array(24)].map((_, index) => (
    <Grid.Item key={`skeleton.${index}`}>
      <Preview.Skeleton format={format} info={InfoMarkup} />
    </Grid.Item>
  ));

  return <Grid {...gridProps}>{ItemsMarkup}</Grid>;
}
