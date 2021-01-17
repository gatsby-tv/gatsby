import React, { useRef } from "react";
import { Button, Flex, Icon } from "@gatsby-tv/components";
import { Subscribe, Promote, Donate, Tip, Misc } from "@gatsby-tv/icons";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

export interface EngagementProps {
  breakpoint: number;
}

export function Engagement(props: EngagementProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Flex
      gap={
        props.breakpoint === 3 ? theme.spacing.base : theme.spacing.basetight
      }
    >
      <Button
        animate
        rounded={theme.border.radius.full}
        padding={theme.spacing.tight}
        bg={theme.colors.font.subdued}
        fg={theme.colors.background[0]}
        highlight={[
          theme.colors.font.subdued.opaquer(0.2),
          theme.colors.background[0],
        ]}
        tooltip="Subscribe"
      >
        <Icon src={Subscribe} w={theme.icon.base} />
      </Button>
      <Button
        animate
        rounded={theme.border.radius.full}
        padding={theme.spacing.tight}
        bg={theme.colors.font.subdued}
        fg={theme.colors.background[0]}
        highlight={[
          theme.colors.font.subdued.opaquer(0.2),
          theme.colors.background[0],
        ]}
        tooltip="Promote"
      >
        <Icon src={Promote} w={theme.icon.base} />
      </Button>
      <Button
        animate
        rounded={theme.border.radius.full}
        padding={theme.spacing.tight}
        bg={theme.colors.font.subdued}
        fg={theme.colors.background[0]}
        highlight={[
          theme.colors.font.subdued.opaquer(0.2),
          theme.colors.background[0],
        ]}
        tooltip="Donate"
      >
        <Icon src={Donate} w={theme.icon.base} />
      </Button>
      <Button
        animate
        rounded={theme.border.radius.full}
        padding={theme.spacing.tight}
        bg={theme.colors.font.subdued}
        fg={theme.colors.background[0]}
        highlight={[
          theme.colors.font.subdued.opaquer(0.2),
          theme.colors.background[0],
        ]}
        tooltip="Tip"
      >
        <Icon src={Tip} w={theme.icon.base} />
      </Button>
      <Button
        animate
        rounded={theme.border.radius.full}
        padding={theme.spacing.tight}
        bg={theme.colors.font.subdued}
        fg={theme.colors.background[0]}
        highlight={[
          theme.colors.font.subdued.opaquer(0.2),
          theme.colors.background[0],
        ]}
        tooltip="Misc"
      >
        <Icon src={Misc} w={theme.icon.base} />
      </Button>
    </Flex>
  );
}
