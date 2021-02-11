import React from "react";
import { Flex, Stream } from "@gatsby-tv/components";
import { TopicBrowsable } from "@gatsby-tv/types";
import { useTheme } from "@gatsby-tv/utilities";

import { ListingContext } from "@src/utilities/listing";

import { Content } from "./components/Content";
import { Skeleton, SkeletonProps } from "./components/Skeleton";

export type { SkeletonProps as TopicListingSkeletonProps };

export interface TopicListingProps {
  topics: TopicBrowsable[];
  groups: number;
  generator?: () => void;
  loading?: boolean;
}

function TopicListingBase(props: TopicListingProps): React.ReactElement {
  const theme = useTheme();
  const { topics, groups, loading, generator = () => undefined } = props;

  const streamProps = {
    component: Content,
    data: topics,
    generator,
    loading,
  };

  return (
    <ListingContext.Provider value={{ groups, format: "default" }}>
      <Flex column gap={theme.spacing[2]}>
        <Stream {...streamProps} />
      </Flex>
    </ListingContext.Provider>
  );
}

export const TopicListing = Object.assign(TopicListingBase, {
  Skeleton,
  displayName: "TopicListing",
});
