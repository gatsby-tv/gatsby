import React from "react";
import { Grid } from "@gatsby-tv/components";
import { Content as ContentType } from "@gatsby-tv/types";

import { Preview } from "@src/components/Preview";
import { useListing } from "@src/utilities/listing";

export type ContentProps = ContentType & {
  ariaPosInSet: number;
};

export function Content(props: ContentProps): React.ReactElement {
  const { ariaPosInSet, ...content } = props;
  const { format } = useListing();

  const previewProps = {
    content,
    format,
    ariaPosInSet,
    ariaSetSize: -1,
  };

  return (
    <Grid.Item>
      <Preview {...previewProps} />
    </Grid.Item>
  );
}
