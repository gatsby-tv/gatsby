import React from "react";
import { Flex } from "@gatsby-tv/components";
import { ifExists, ifNotExists, useTheme } from "@gatsby-tv/utilities";

import { Preview, PreviewProps } from "@src/components/Preview";
import { useListing } from "@src/utilities/listing";

export type ContentProps = Omit<PreviewProps, "compact">;

export function Content(props: ContentProps): React.ReactElement {
  const theme = useTheme();
  const grid = useListing();

  return (
    <Flex.Item>
      <Preview compact={ifNotExists(grid)} {...props} />
    </Flex.Item>
  );
}
