import React from "react";
import { css } from "styled-components";
import { useSession } from "next-auth/client";
import { Box, Flex } from "@gatsby-tv/components";
import { useTheme, useFrame } from "@gatsby-tv/utilities";

import { cssShadow } from "@src/styles/shadows";

import { Navigation } from "./components/Navigation";
import { Search } from "./components/Search";
import { Account } from "./components/Account";
import { SignedOut } from "./components/SignedOut";

export function Topbar(): React.ReactElement {
  const theme = useTheme();
  const [session, loading] = useSession();
  const { fullscreen } = useFrame();

  const style = css`
    transition: transform ${theme.duration.fast} ease;
    transform: translateY(${fullscreen ? "-50px" : "0px"});
  `;

  return (
    <Box
      css={cssShadow}
      h={fullscreen ? "0px" : "50px"}
      bg={theme.colors.background[1]}
      zIndex={5}
    >
      <Flex h={1} align="stretch" distribute="fill-evenly">
        <Flex.Item>
          <Flex
            expand
            justify="flex-start"
            align="stretch"
            gap={theme.spacing.base}
          >
            <Navigation />
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Flex expand center align="center">
            <Search />
          </Flex>
        </Flex.Item>
        <Flex.Item>
          <Flex
            expand
            justify="flex-end"
            align="center"
            gap={theme.spacing.tight}
          >
            {session ? <Account /> : <SignedOut />}
          </Flex>
        </Flex.Item>
      </Flex>
    </Box>
  );
}
