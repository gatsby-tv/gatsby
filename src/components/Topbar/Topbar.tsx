import React from "react";
import Link from "next/link";
import { css } from "styled-components";
import { Box, Flex, Icon, Link as UnstyledLink } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/components/dist/utilities";
import { Gatsby } from "@gatsby-tv/icons";

export interface TopbarParams {}

export function Topbar(params: TopbarParams) {
  const theme = useTheme();

  const shadow = css`
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0 2px rgba(0, 0, 0, 0.1);
  `

  return (
    <Box $height="52px" bg={theme.colors.background[1]}>
      <Flex
        css={shadow}
        align="stretch"
        $height={1}
        paddingLeft={theme.spacing.tight}
        paddingRight={theme.spacing.tight}
      >
        <Flex.Item grow={1}>
          <Flex $fill justify="flex-start" align="stretch">
            <Link href="/" passHref>
              <UnstyledLink>
                <Icon
                  $width={theme.icon.small}
                  $height={1}
                  source={Gatsby}
                />
              </UnstyledLink>
            </Link>
          </Flex>
        </Flex.Item>
        <Flex.Item grow={1}>
          <Flex center $width={1}>
          </Flex>
        </Flex.Item>
        <Flex.Item grow={1}>
          <Flex justify="flex-end" align="stretch" $width={1}>
          </Flex>
        </Flex.Item>
      </Flex>
    </Box>
  );
}
