import React from "react";
import { css } from "styled-components";
import { Box, Button, Flex, Icon } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";
import { GatsbyPlain, Gear } from "@gatsby-tv/icons";

import { Link } from "@src/components/Link";

export function LoggedOut(): React.ReactElement {
  const theme = useTheme();

  const shadow = css`
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9), 0 0 2px rgba(0, 0, 0, 0.1);
  `;

  return (
    <Box $height="48px" $bg={theme.colors.background[1]} $zIndex={100}>
      <Flex
        css={shadow}
        $align="stretch"
        $height={1}
        $paddingLeft={theme.spacing.tight}
        $paddingRight={theme.spacing.tight}
      >
        <Flex.Item $grow={1}>
          <Flex $fill $justify="flex-start" $align="stretch">
            <Link href="/">
              <Icon
                $source={GatsbyPlain}
                $width={theme.icon.large}
                $height={1}
              />
            </Link>
          </Flex>
        </Flex.Item>
        <Flex.Item $grow={1}>
          <Flex $center $width={1}></Flex>
        </Flex.Item>
        <Flex.Item $grow={1}>
          <Flex $justify="flex-end" $align="center" $height={1} $width={1}>
            <Flex.Item>
              <Button
                $bg={theme.colors.background[5]}
                $highlight={[
                  theme.colors.background[5].lighten(0.2),
                  theme.colors.background[5],
                ]}
              >
                Log In
              </Button>
            </Flex.Item>
            <Flex.Item
              $marginLeft={theme.spacing.tight}
              $marginRight={theme.spacing.tight}
            >
              <Button
                $bg={theme.colors.gold}
                $fg={theme.colors.background[1]}
                $highlight={[
                  theme.colors.gold.lighten(0.1),
                  theme.colors.gold.fade(0.1),
                ]}
              >
                Sign Up
              </Button>
            </Flex.Item>
            <Flex.Item>
              <Button
                $rounded={theme.border.radius.full}
                $highlight={theme.colors.background[5]}
                $padding={theme.spacing.tight}
              >
                <Icon $source={Gear} $width={theme.icon.baseSmall} />
              </Button>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </Box>
  );
}
