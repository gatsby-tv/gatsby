import React from "react";
import { Box, Flex, Icon, TextDisplay } from "@gatsby-tv/components";
import { ExtendRight } from "@gatsby-tv/icons";
import { useTheme } from "@gatsby-tv/utilities";

import { Link } from "@src/components/Link";

export interface TitleProps {
  title?: string;
  href?: string;
  thin?: boolean;
}

export function Title(props: TitleProps): React.ReactElement | null {
  const { title, href, thin } = props;
  const theme = useTheme();

  return title && href ? (
    <Box w="fit-content">
      <Link underline href={href}>
        <Flex gap={theme.spacing[1]} align="center" paddingBottom=".2rem">
          <TextDisplay thin={thin}>{props.title}</TextDisplay>
          <Icon src={ExtendRight} w={theme.icon.small} />
        </Flex>
      </Link>
    </Box>
  ) : title ? (
    <TextDisplay thin={thin}>{title}</TextDisplay>
  ) : null;
}
