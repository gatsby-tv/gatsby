import React from "react";
import { Flex } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { Engagement as EngagementButton } from "@src/components/Engagement";

export function Engagement(): React.ReactElement {
  const theme = useTheme();

  const flexProps = {
    gap: theme.spacing[1],
    margin: [theme.spacing[0], theme.spacing[0], theme.spacing[0.5]],
  };

  return (
    <Flex {...flexProps}>
      <EngagementButton type="subscribe" />
      <EngagementButton type="promote" />
      <EngagementButton type="donate" />
      <EngagementButton type="tip" />
      <EngagementButton type="misc" />
    </Flex>
  );
}
