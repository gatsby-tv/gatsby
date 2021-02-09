import React from "react";
import { Grid, Stream } from "@gatsby-tv/components";
import { Content as ContentType } from "@gatsby-tv/types";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { ListingFormat } from "@src/types";
import { ListingContext } from "@src/utilities/listing";

import { Content } from "./components/Content";
import { Skeleton, SkeletonProps } from "./components/Skeleton";

export type { SkeletonProps as ListingSkeletonProps };

export interface ListingProps {
  content: ContentType[];
  generator?: () => void;
  loading?: boolean;
  groups?: number;
  format?: ListingFormat;
}

function ListingBase(props: ListingProps): React.ReactElement {
  const {
    content,
    loading,
    generator = () => undefined,
    groups = 1,
    format = "default",
  } = props;
  const theme = useTheme();

  const gridProps = {
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: ifExists(groups > 1),
    gap: theme.spacing[1.5],
  };

  const streamProps = {
    component: Content,
    data: content,
    generator,
    loading,
  };

  return (
    <ListingContext.Provider value={{ groups, format }}>
      <Grid {...gridProps}>
        <Stream {...streamProps} />
      </Grid>
    </ListingContext.Provider>
  );
}

export const Listing = Object.assign(ListingBase, { Skeleton });
