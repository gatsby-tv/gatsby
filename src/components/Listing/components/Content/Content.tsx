import React from "react";
import { DefaultTheme } from "styled-components";
import { Flex } from "@gatsby-tv/components";
import { ifNotExists, useFrame, useTheme } from "@gatsby-tv/utilities";

import { Preview, PreviewProps } from "@src/components/Preview";
import { useListing } from "@src/utilities/listing";

export type ContentProps = Omit<PreviewProps, "compact">;

function getAvatarSize(theme: DefaultTheme, screen: string): string {
  switch (screen) {
    case "mobile":
      return theme.avatar.small;

    case "tablet":
      return theme.avatar.basesmall;

    default:
      return theme.avatar.base;
  }
}

export function Content(props: ContentProps): React.ReactElement {
  const theme = useTheme();
  const grid = useListing();
  const { screen } = useFrame();

  return (
    <Flex.Item>
      <Preview
        expand
        compact={ifNotExists(grid)}
        avatar={getAvatarSize(theme, screen)}
        {...props}
      />
    </Flex.Item>
  );
}
