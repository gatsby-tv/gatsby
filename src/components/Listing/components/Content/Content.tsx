import React from "react";
import { Grid } from "@gatsby-tv/components";
import { Content as ContentType } from "@gatsby-tv/types";

import { Preview } from "@src/components/Preview";
import { useListing } from "@src/utilities/listing";

export type ContentProps = ContentType;

export function Content(props: ContentProps): React.ReactElement {
  const { groups, format } = useListing();

  return (
    <Grid.Item>
      <Preview format={groups > 1 ? format : "compact"} content={props} />
    </Grid.Item>
  );
}
