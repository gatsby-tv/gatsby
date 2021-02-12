import React from "react";
import { signOut } from "next-auth/client";
import {
  Flex,
  Avatar,
  Icon,
  Button,
  TextBox,
  Menu,
  Placement,
} from "@gatsby-tv/components";
import { Exit } from "@gatsby-tv/icons";
import { User } from "@gatsby-tv/types";
import { useTheme, useMenu } from "@gatsby-tv/utilities";

export interface SignedInProps {
  user: User;
}

export function SignedIn(props: SignedInProps): React.ReactElement | null {
  const { user } = props;
  const settings = useMenu<HTMLButtonElement>();
  const theme = useTheme();

  const buttonProps = {
    ref: settings.ref,
    padding: theme.spacing[0],
    onClick: settings.toggle,
  };

  const menuProps = {
    w: "20rem",
    placement: "bottom-end" as Placement,
    offset: [0, 7],
    active: settings.active,
    onExit: settings.deactivate,
  };

  const AvatarMarkup = (
    <Button {...buttonProps}>
      <Avatar src={user.avatar} size={theme.avatar.smaller} />
    </Button>
  );

  const MenuSignOutMarkup = (
    <Menu.Item onClick={signOut}>
      <Flex gap={theme.spacing[1]}>
        <Icon src={Exit} w={theme.icon.small} />
        <TextBox font={theme.font[4]} weight={600}>
          Sign Out
        </TextBox>
      </Flex>
    </Menu.Item>
  );

  return (
    <>
      {AvatarMarkup}
      <Menu for={settings.ref} {...menuProps}>
        {MenuSignOutMarkup}
      </Menu>
    </>
  );
}
