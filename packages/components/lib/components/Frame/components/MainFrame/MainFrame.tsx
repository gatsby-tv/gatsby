import React from "react";

import { Box } from "@lib/components/Box";
import { Scroll } from "@lib/components/Scroll";

export interface MainFrameProps {
  children?: React.ReactNode;
  scrollHidden?: boolean;
  offsetX?: number;
  offsetY?: number;
}

export function MainFrame(props: MainFrameProps): React.ReactElement {
  const { scrollHidden, offsetX, offsetY } = props;

  const scrollProps = {
    hide: scrollHidden,
    maxw: offsetX ? `calc(100vw - ${offsetX}px)` : "100vw",
    maxh: offsetY ? `calc(100vh - ${offsetY}px)` : "100vh",
  };

  return (
    <Box as="main" expand>
      <Scroll {...scrollProps}>{props.children}</Scroll>
    </Box>
  );
}
