import React from "react";
import { Grid } from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";
import { Link } from "@gatsby-tv/next";
import Preview, { PreviewFormat } from "@gatsby-tv/preview";

import { Info } from "@src/components/Info";

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

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: ifExists(groups > 1),
    gap: [
      theme.spacing[1.5],
      format !== "column" ? theme.spacing[1.5] : theme.spacing[3],
    ],
  };

  const previewProps = {
    format,
    info: <Info.Skeleton content channel={!nochannel} avatar={avatar} />,
  };

  const ItemsMarkup = [...Array(24)].map((_, index) => (
    <Grid.Item key={`skeleton.${index}`}>
      <Preview.Skeleton {...previewProps} />
    </Grid.Item>
  ));

  return <Grid {...gridProps}>{ItemsMarkup}</Grid>;
}
