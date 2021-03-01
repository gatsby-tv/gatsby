import React from "react";
import { Grid, Stream } from "@gatsby-tv/components";
import { Content as ContentType } from "@gatsby-tv/types";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { PreviewFormat } from "@src/types";
import { ListingContext } from "@src/utilities/listing";

import { Content } from "./components/Content";

import { Skeleton, SkeletonProps } from "./Skeleton";

export type { SkeletonProps as ListingSkeletonProps };

export interface ListingProps {
  id?: string;
  content: ContentType[];
  generator?: () => void;
  loading?: boolean;
  groups?: number;
  format?: PreviewFormat;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

function ListingBase(props: ListingProps): React.ReactElement {
  const {
    id,
    content,
    loading,
    generator = () => undefined,
    groups = 1,
    format = "default",
    ariaLabel,
    ariaLabelledBy,
  } = props;
  const theme = useTheme();

  const gridProps = {
    id,
    template: `repeat(${groups}, 1fr)`,
    justify: "stretch",
    center: ifExists(groups > 1),
    gap: [
      theme.spacing[1.5],
      format === "compact" ? theme.spacing[1.5] : theme.spacing[3],
    ],
    role: "feed",
    "aria-busy": loading,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  };

  const streamProps = {
    component: Content,
    data: content.map((item, index) => ({
      ariaPosInSet: index + 1,
      ...item,
    })),
    generator,
    loading,
  };

  return (
    <ListingContext.Provider value={{ groups, format }}>
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
