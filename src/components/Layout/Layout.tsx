import React from "react";
import { Frame, Box } from "@gatsby-tv/components";

import { Topbar } from "@src/components/Topbar";

export interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout(props: LayoutProps): React.ReactElement {
  return (
    <Frame $topbar={<Topbar />}>
      <Box $height="calc(100vh - 52px)" $padding="0 52px">
        {props.children}
      </Box>
    </Frame>
  );
}
