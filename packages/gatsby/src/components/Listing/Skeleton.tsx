import React from "react";
import { Grid } from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { PreviewFormat } from "@src/types";
import { Preview } from "@src/components/Preview";

export interface SkeletonProps {
  groups?: number;
  format?: PreviewFormat;
}

export function Skeleton(props: SkeletonProps): React.ReactElement {
  const { groups = 1, format = "default" } = props;
  const theme = useTheme();

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: ifExists(groups > 1),
    gap: theme.spacing[1.5],
  };

  const ItemsMarkup = [...Array(24)].map((_, index) => (
    <Grid.Item key={`skeleton.${index}`}>
      <Preview.Skeleton format={groups > 1 ? format : "compact"} />
    </Grid.Item>
  ));

  return <Grid {...gridProps}>{ItemsMarkup}</Grid>;
}
