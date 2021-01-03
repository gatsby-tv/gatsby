import React from "react";
import { Button, Icon } from "@gatsby-tv/components";
import { IconSource } from "@gatsby-tv/components/dist/types";
import { useTheme } from "@gatsby-tv/utilities";

export interface EngagementButtonProps {
  source: IconSource;
}

export function EngagementButton(
  props: EngagementButtonProps
): React.ReactElement {
  const theme = useTheme();

  return (
    <Button
      $animate
      $rounded={theme.border.radius.full}
      $padding={theme.spacing.tight}
      $bg={theme.colors.font.subdued}
      $fg={theme.colors.background[0]}
      $highlight={[
        theme.colors.font.subdued.opaquer(0.2),
        theme.colors.background[0],
      ]}
    >
      <Icon $source={props.source} $width={theme.icon.base} />
    </Button>
  );
}
