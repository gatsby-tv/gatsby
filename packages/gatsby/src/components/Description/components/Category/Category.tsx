import React from "react";
import { Flex, Optional } from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";
import { Topic, Genre } from "@gatsby-tv/types";

import { CategoryLink } from "@src/components/CategoryLink";

export interface CategoryProps {
  topic?: Topic;
  genre?: Genre;
}

export function Category(props: CategoryProps): React.ReactElement {
  const { topic, genre } = props;
  const theme = useTheme();

  const optionalProps = {
    active: ifExists(topic && genre),
    $props: { gap: theme.spacing[1.5], w: "fit-content" },
  };

  const TopicMarkup = topic ? (
    <CategoryLink topic={topic} href={`/d/topic/${topic}`} />
  ) : null;

  const GenreMarkup = genre ? (
    <CategoryLink
      genre={genre}
      href={topic ? `/d/topic/${topic}/${genre}` : `/d/genre/${genre}`}
    />
  ) : null;

  return (
    <Optional component={Flex} {...optionalProps}>
      {TopicMarkup}
      {GenreMarkup}
    </Optional>
  );
}
