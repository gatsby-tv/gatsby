import React from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { css } from "styled-components";
import { Box } from "@gatsby-tv/components";
import { User, UserContentFeeds } from "@gatsby-tv/types";
import { useTheme } from "@gatsby-tv/utilities";

import { useUserFeeds } from "@src/utilities/use-user-feeds";

import { SignedOut } from "./components/SignedOut";
import { SignedIn } from "./components/SignedIn";

import { Skeleton } from "./Skeleton";

export function Sidebar(): React.ReactElement {
  const theme = useTheme();
  const router = useRouter();
  const [session, loading] = useSession();

  const disabled = router.pathname.startsWith("/v/");

  const style = css`
    transition: transform ${theme.duration.fast} ease;
    transform: translateX(${disabled ? "-50px" : "0px"});
  `;

  const boxProps = {
    w: disabled ? "0px" : "50px",
    h: 1,
    bg: theme.colors.background[2],
    zIndex: 4,
  };

  const BodyMarkup =
    loading ? (
      <Skeleton />
    ) : session ? (
      <SignedIn user={session.user} />
    ) : (
      <SignedOut />
    );

  return (
    <Box css={style} {...boxProps}>
      {BodyMarkup}
    </Box>
  );
}
