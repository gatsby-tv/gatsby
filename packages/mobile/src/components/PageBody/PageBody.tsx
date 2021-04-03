import React from "react";
import { Box } from "@gatsby-tv/components";
import { useTheme, ifExists } from "@gatsby-tv/utilities";

import { usePageMargin } from "@src/utilities/use-page-margin";

export interface PageBodyProps {
  children?: React.ReactNode;
}

export function PageBody(props: PageBodyProps): React.ReactElement {
  const { children } = props;
  const theme = useTheme();
  const margin = usePageMargin();

  const boxProps = {
    margin: margin ? [theme.spacing[1.5], theme.spacing[0]] : theme.spacing[1.5],
  };

  return (
    <Box {...boxProps}>
      <Box maxw="200rem" margin={[theme.spacing[0], "auto"]}>
        {children}
      </Box>
    </Box>
  );
}
