import React from "react";
import { Stream } from "@gatsby-tv/components";
import {
  ifExists,
  ifNotExists,
  useTheme,
  useBreakpoints,
} from "@gatsby-tv/utilities";

import { ListingContext } from "@src/utilities/listing";

import { Content, ContentProps } from "./components/Content";

export type ListingContentProps = ContentProps;
export type ListingGenerator = () => ListingContentProps[];

export interface ListingProps {
  generator: ListingGenerator;
  grid?: boolean;
}

export function Listing(props: ListingProps): React.ReactElement {
  const theme = useTheme();
  const breakpoint = useBreakpoints({
    1: "(max-width: 650px)",
    2: "(min-width: 651px) and (max-width: 1200px)",
    3: "(min-width: 1201px)",
  }) as number;

  return (
    <ListingContext.Provider value={Boolean(props.grid) || breakpoint === 1}>
      <Stream
        center={ifExists(props.grid)}
        wrapped={ifExists(props.grid)}
        column={ifNotExists(props.grid)}
        gap={
          props.grid && breakpoint > 1
            ? theme.spacing.baseloose
            : theme.spacing.base
        }
        max={20}
        groups={ifExists(props.grid, Math.max(breakpoint, 1))}
        component={Content}
        generator={props.generator}
      />
    </ListingContext.Provider>
  );
}
