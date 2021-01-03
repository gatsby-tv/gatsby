import React from "react";
import { useTheme } from "@gatsby-tv/utilities";
import { ExtendRight } from "@gatsby-tv/icons";
import {
  Box,
  TextDisplay,
  TextSubheading,
  Flex,
  Icon,
} from "@gatsby-tv/components";

import { Link } from "@src/components/Link";

export interface CategoryTagProps {
  type?: "topic" | "genre";
  title?: string;
}

export function CategoryTag(props: CategoryTagProps): React.ReactElement {
  const theme = useTheme();

  return (
    <Flex
      $column
      $rounded={theme.border.radius.smallest}
      $paddingTop={theme.spacing.tight}
      $paddingBottom={theme.spacing.extraTight}
      $paddingLeft={theme.spacing.base}
      $paddingRight={theme.spacing.base}
      $bg={theme.colors.background[3]}
      $gap={theme.spacing.extraTight}
    >
      <TextSubheading>{props.type}</TextSubheading>
      <Flex $gap={theme.spacing.base}>
        <TextDisplay $thin>{props.title}</TextDisplay>
        <Icon $source={ExtendRight} $width={theme.icon.baseSmall} />
      </Flex>
      <Link href="/">
        <Box $absolute $fill />
      </Link>
    </Flex>
  );
}
