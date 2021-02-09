import React from "react";
import { css } from "styled-components";
import { useSession } from "next-auth/client";
import { Box, Flex } from "@gatsby-tv/components";
import { User } from "@gatsby-tv/types";
import { useTheme, useFrame } from "@gatsby-tv/utilities";

import { cssShadow } from "@src/styles/shadows";

import { Navigation } from "./components/Navigation";
import { Search } from "./components/Search";
import { Skeleton } from "./components/Skeleton";
import { SignedIn } from "./components/SignedIn";
import { SignedOut } from "./components/SignedOut";

export function Topbar(): React.ReactElement {
  const theme = useTheme();
  const [session, loading] = useSession();
  const { fullscreen } = useFrame();

  const style = css`
    ${cssShadow}
    transition: transform ${theme.duration.fast} ease;
    transform: translateY(${fullscreen ? "-50px" : "0px"});
  `;

  const boxProps = {
    h: fullscreen ? "0px" : "50px",
    bg: theme.colors.background[1],
    zIndex: 5,
  };

  const navigationFlexProps = {
    expand: true,
    justify: "flex-start",
    align: "stretch",
    gap: theme.spacing[1.5],
  };

  const searchFlexProps = {
    expand: true,
    center: true,
    align: "center",
  };

  const accountFlexProps = {
    expand: true,
    justify: "flex-end",
    align: "center",
    gap: theme.spacing[1],
  };

  const AccountMarkup = loading ? (
    <Skeleton />
  ) : session ? (
    <SignedIn user={session.user as User} />
  ) : (
    <SignedOut />
  );

  const NavigationMarkup = (
    <Flex.Item>
      <Flex {...navigationFlexProps}>
        <Navigation />
      </Flex>
    </Flex.Item>
  );

  const SearchMarkup = (
    <Flex.Item>
      <Flex {...searchFlexProps}>
        <Search />
      </Flex>
    </Flex.Item>
  );

  const InfoMarkup = (
    <Flex.Item marginRight={theme.spacing[1]}>
      <Flex {...accountFlexProps}>{AccountMarkup}</Flex>
    </Flex.Item>
  );

  return (
    <Box css={style} {...boxProps}>
      <Flex h={1} align="stretch" distribute="fill-evenly">
        {NavigationMarkup}
        {SearchMarkup}
        {InfoMarkup}
      </Flex>
    </Box>
  );
}
