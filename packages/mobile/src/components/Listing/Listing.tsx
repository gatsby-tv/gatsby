import React from "react";
import { Grid, Stream } from "@gatsby-tv/components";
import { Content } from "@gatsby-tv/types";
import { ifExists, useTheme } from "@gatsby-tv/utilities";
import { PreviewFormat } from "@gatsby-tv/preview";

import { ListingContext } from "@src/utilities/listing";

import { Article } from "./components/Article";
import { Skeleton, SkeletonProps } from "./Skeleton";

export type { SkeletonProps as ListingSkeletonProps };

export interface ListingProps {
  id?: string;
  content: Content[];
  generator?: () => void;
  loading?: boolean;
  groups?: number;
  format?: PreviewFormat;
  nochannel?: boolean;
  avatar?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

function ListingBase(props: ListingProps): React.ReactElement {
  const theme = useTheme();
  const {
    id,
    content,
    loading,
    generator = () => undefined,
    groups = 1,
    format = "column",
    avatar,
    nochannel,
    ariaLabel,
    ariaLabelledBy,
  } = props;

  const gridProps = {
    id,
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: groups > 1,
    gap: theme.spacing[1.5],
    role: "feed",
    "aria-busy": loading,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  };

  const streamProps = {
    component: Article,
    data: content.map((item, index) => ({
      ariaPosInSet: index + 1,
      ...item,
    })),
    generator,
    loading,
  };

  return (
    <ListingContext.Provider value={{ groups, format, nochannel, avatar }}>
      <Grid as="section" {...gridProps}>
        <Stream {...streamProps} />
      </Grid>
    </ListingContext.Provider>
  );
}

export const Listing = Object.assign(ListingBase, {
  Skeleton,
  displayName: "Listing",
});
