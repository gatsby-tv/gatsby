import React from "react";
import { Video } from "@gatsby-tv/types";
import { TextBox, Flex, Stream } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { ListingContext } from "@src/utilities/listing";
import { ListingFormat } from "@src/types";

import { Section } from "./components/Section";
import { Skeleton, SkeletonProps } from "./components/Skeleton";

export type { SkeletonProps as ReleaseListingSkeletonProps };

export interface ReleaseListingProps {
  videos: Video[];
  groups: number;
  generator?: () => void;
  loading?: boolean;
  format?: ListingFormat;
}

function ReleaseListingBase(props: ReleaseListingProps): React.ReactElement {
  const {
    videos,
    groups,
    loading,
    generator = () => undefined,
    format = "default",
  } = props;
  const theme = useTheme();

  // Temporary accomodation, since releaseDate is a string when
  // being pulled from our testing API.
  const content = videos.map((video) => ({
    ...video,
    releaseDate: new Date(video.releaseDate),
  }));

  const today = new Date(
    new Date().setHours(0, 0, 0, 0) - new Date().getTimezoneOffset() * 60 * 1000
  );
  const yesterday = new Date(+today - 24 * 60 * 60 * 1000);
  const week = new Date(+today - 6 * 24 * 60 * 60 * 1000);
  const month = new Date(+today - 30 * 24 * 60 * 60 * 1000);

  const sections = [
    {
      title: "Today",
      content: content.filter((video) => video.releaseDate >= today),
    },
    {
      title: "Yesterday",
      content: content.filter(
        (video) => video.releaseDate < today && video.releaseDate >= yesterday
      ),
    },
    {
      title: "This Week",
      content: content.filter(
        (video) => video.releaseDate < yesterday && video.releaseDate >= week
      ),
    },
    {
      title: "This Month",
      content: content.filter(
        (video) => video.releaseDate < week && video.releaseDate >= month
      ),
    },
    {
      title: "Older",
      content: content.filter((video) => video.releaseDate < month),
    },
  ];

  const streamProps = {
    component: Section,
    data: sections,
    generator,
    loading,
  };

  const StreamMarkup = content.length ? (
    <Stream {...streamProps} />
  ) : (
    <TextBox expand font={theme.font[4]} align="center">
      No content to display...
    </TextBox>
  );

  return (
    <ListingContext.Provider value={{ groups, format }}>
      <Flex column gap={theme.spacing[3]}>
        {StreamMarkup}
      </Flex>
    </ListingContext.Provider>
  );
}

export const ReleaseListing = Object.assign(ReleaseListingBase, {
  Skeleton,
  displayName: "ReleaseListing",
});
