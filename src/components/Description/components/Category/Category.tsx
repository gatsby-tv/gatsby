import React from "react";
import { Flex, Optional } from "@gatsby-tv/components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";
import { Topic, Genre } from "@gatsby-tv/types";

import { CategoryLink } from "@src/components/CategoryLink";

export interface CategoryProps {
  breakpoint: number;
  topic?: Topic;
  genre?: Genre;
}

export function Category(props: CategoryProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Optional
      active={ifExists(props.topic && props.genre)}
      component={Flex}
      $props={{
        gap: theme.spacing.base,
        column: props.breakpoint === 0,
        w: "fit-content",
      }}
    >
      {props.topic && (
        <CategoryLink topic={props.topic} href={`/d/topic/${props.topic}`} />
      )}
      {props.genre && (
        <CategoryLink
          genre={props.genre}
          href={
            props.topic
              ? `/d/topic/${props.topic}/${props.genre}`
              : `/d/genre/${props.genre}`
          }
        />
      )}
    </Optional>
  );
}
