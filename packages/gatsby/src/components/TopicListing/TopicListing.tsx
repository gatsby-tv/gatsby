import React from "react";
import { Flex, Stream } from "@gatsby-tv/components";
import { TopicBrowsable } from "@gatsby-tv/types";
import { useTheme } from "@gatsby-tv/utilities";

import { ListingContext } from "@src/utilities/listing";

import { Content } from "./components/Content";

import { Skeleton, SkeletonProps } from "./Skeleton";

export type { SkeletonProps as TopicListingSkeletonProps };

export interface TopicListingProps {
  id?: string;
  topics: TopicBrowsable[];
  groups: number;
  generator?: () => void;
  loading?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

function TopicListingBase(props: TopicListingProps): React.ReactElement {
  const theme = useTheme();
  const {
    id,
    topics,
    groups,
    loading,
    generator = () => undefined,
    ariaLabel,
    ariaLabelledBy,
  } = props;

  const flexProps = {
    id,
    column: true,
    gap: theme.spacing[2],
    role: "feed",
    "aria-busy": loading,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  };

  const streamProps = {
    component: Content,
    data: topics,
    generator,
    loading,
  };

  return (
    <ListingContext.Provider value={{ groups, format: "default" }}>
      <Flex as="section" {...flexProps}>
        <Stream {...streamProps} />
      </Flex>
    </ListingContext.Provider>
  );
}

export const TopicListing = Object.assign(TopicListingBase, {
  Skeleton,
  displayName: "TopicListing",
});
