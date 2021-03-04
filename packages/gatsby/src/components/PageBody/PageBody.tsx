import React from "react";
import { Box } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

export interface PageBodyProps {
  children?: React.ReactNode;
  tight?: boolean;
}

export function PageBody(props: PageBodyProps): React.ReactElement {
  const { children, tight } = props;
  const theme = useTheme();

  const boxProps = tight ? {
    margin: [theme.spacing[1.5], theme.spacing[3]],
  } : {
    margin: theme.spacing[3],
  };

  return (
    <Box {...boxProps}>
      <Box maxw="200rem" margin={[theme.spacing[0], "auto"]}>
        {children}
      </Box>
    </Box>
  );
}
