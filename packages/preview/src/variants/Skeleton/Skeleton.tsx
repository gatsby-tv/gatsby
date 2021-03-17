import React from "react";
import { Box, Optional, Flex, Image } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { PreviewSkeletonProps } from "@src/types";

export function Skeleton(props: PreviewSkeletonProps): React.ReactElement {
  const theme = useTheme();
  const { format = "column", info: Info } = props;

  const flexProps = {
    column: format === "column",
    w: 1,
    gap: theme.spacing[1],
  };

  const itemProps = {
    active: format !== "column",
    $props: { basis: format === "compact" ? 2.0 : 0.8 },
  };

  const InfoMarkup = Info ? (
    <Optional component={Flex.Item} {...itemProps}>
      {Info}
    </Optional>
  ) : null;

  return (
    <Flex {...flexProps}>
      <Image rounded={theme.border.radius.smallest} aspectRatio={0.5625} />
      {InfoMarkup}
      <Box absolute expand />
    </Flex>
  );
}
