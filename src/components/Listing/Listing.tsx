import React from "react";

import { Grid, Column } from "./components";

export interface ListingProps {
  column?: boolean;
}

export function Listing(props: ListingProps): React.ReactElement {
  return props.column ? <Column /> : <Grid />
}
