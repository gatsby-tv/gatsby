import React from "react";
import { Box, Flex } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { cssTopbarShadow } from "@src/styles/shadows";
import { useUser } from "@src/utilities/use-user";

import { Navigation } from "./components/Navigation";
import { Search } from "./components/Search";
import { Account } from "./components/Account";
import { Login } from "./components/Login";

export function Topbar(): React.ReactElement {
  const theme = useTheme();
  const user = useUser();

  return (
    <Box
      css={cssTopbarShadow}
      h="50px"
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
            {user ? <Account /> : <Login />}
          </Flex>
        </Flex.Item>
      </Flex>
    </Box>
  );
}
