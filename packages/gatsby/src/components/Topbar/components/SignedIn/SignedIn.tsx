import React from "react";
import { signOut } from "next-auth/client";
import {
  Flex,
  Avatar,
  Icon,
  Button,
  TextBox,
  Rule,
  Menu,
  Placement,
} from "@gatsby-tv/components";
import { User, Exit } from "@gatsby-tv/icons";
import { UserType } from "@gatsby-tv/types";
import { useTheme, useMenu } from "@gatsby-tv/utilities";

export interface SignedInProps {
  user: UserType;
}

export function SignedIn(props: SignedInProps): React.ReactElement | null {
  const { user } = props;
  const menu = useMenu<HTMLButtonElement>();
  const theme = useTheme();

  const buttonProps = {
    ref: menu.ref,
    padding: theme.spacing[0],
    onClick: menu.toggle,
  };

  const menuProps = {
    w: "20rem",
    placement: "bottom-end" as Placement,
    offset: [0, 7],
    active: menu.active,
    onExit: menu.deactivate,
  };

  const AvatarMarkup = (
    <Button {...buttonProps}>
      <Avatar src={user.avatar} size={theme.avatar.smaller} />
    </Button>
  );

  return (
    <>
      {AvatarMarkup}
      <Menu for={menu.ref} {...menuProps}>
        <Menu.Link icon={User} href={`/u/${user.handle}`}>
          Profile
        </Menu.Link>
        <Rule />
        <Menu.Item icon={Exit} onClick={signOut}>
          Sign Out
        </Menu.Item>
      </Menu>
    </>
  );
}
