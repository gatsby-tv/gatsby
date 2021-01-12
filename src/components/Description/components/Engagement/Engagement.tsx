import React from "react";
import { Button, Flex, Icon } from "@gatsby-tv/components";
import { Subscribe, Promote, Donate, Tip, Misc } from "@gatsby-tv/icons";
import { useTheme } from "@gatsby-tv/utilities";

export function Engagement(): React.ReactElement {
  const theme = useTheme();

  return (
    <Flex gap={theme.spacing.base}>
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
      >
        <Icon src={Misc} w={theme.icon.base} />
      </Button>
    </Flex>
  );
}
