import React, { useState, useEffect } from "react";
import { Stream } from "@gatsby-tv/components";
import { ifExists, useTheme, useBreakpoints } from "@gatsby-tv/utilities";

import { ListingContext } from "@src/utilities/listing";

import { GridWrapper } from "./components/GridWrapper";
import { Content, ContentProps } from "./components/Content";

export type ListingContentProps = ContentProps;
export type ListingGenerator = () => ListingContentProps[];

export interface ListingProps {
  generator: ListingGenerator;
  grid?: boolean;
}

export function Listing(props: ListingProps): React.ReactElement {
  const theme = useTheme();
  const [groups, setGroups] = useState(3);
  const breakpoint = useBreakpoints({
    small: "(max-width: 768px)",
    medium: "(min-width: 768px) and (max-width: 1200px)",
    large: "(min-width: 1200px)",
  });

  useEffect(() => {
    switch (breakpoint) {
      case "small":
        return setGroups(1);
      case "medium":
        return setGroups(2);
      case "large":
        return setGroups(3);
    }
  }, [breakpoint]);

  return (
    <ListingContext.Provider value={Boolean(props.grid)}>
      <Stream
        center={props.grid}
        wrapped={props.grid}
        column={!props.grid}
        gap={props.grid ? theme.spacing.baseLoose : theme.spacing.base}
        max={20}
        groups={ifExists(props.grid, groups)}
        component={Content}
        generator={props.generator}
      />
    </ListingContext.Provider>
  );
}
