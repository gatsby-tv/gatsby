import React from "react";
import { useRouter } from "next/router";
import { css } from "styled-components";
import { Avatar, Box, Flex } from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";

import { useSubscriptions } from "@src/utilities/use-subscriptions";

export interface SidebarProps {
  disabled?: boolean;
}

export function Sidebar(props: SidebarProps): React.ReactElement {
  const theme = useTheme();
  const router = useRouter();
  const subscriptions = useSubscriptions();

  const disabled = router.pathname.startsWith("/v/");

  const style = css`
    transition: transform ${theme.duration.fast} ease;
    transform: translateX(${disabled ? "-50px" : "0px"});
  `;

  return (
    <Box
      css={style}
      w={disabled ? "0px" : "50px"}
      h={1}
      bg={theme.colors.background[2]}
      zIndex={4}
    >
      <Flex
        column
        align="center"
        distribute="fill-evenly"
        gap={theme.spacing.tight}
        padding={[
          theme.spacing.basetight,
          theme.spacing.none,
          theme.spacing.none,
        ]}
      >
        {subscriptions.slice(0, 9).map((subscription, index) => (
          <Avatar
            key={index}
            src={subscription.avatar}
            size={theme.avatar.basesmall}
          />
        ))}
      </Flex>
    </Box>
  );
}
