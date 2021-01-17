import React from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Fireworks,
  Scroll,
  Icon,
  Menu,
  Modal,
} from "@gatsby-tv/components";
import { Gear } from "@gatsby-tv/icons";
import { useTheme, useMenu, useModal } from "@gatsby-tv/utilities";

import { SignIn } from "@src/components/SignIn";

export function SignedOut(): React.ReactElement {
  const theme = useTheme();
  const login = useModal();
  const signup = useModal();
  const settings = useMenu<HTMLButtonElement>();

  const button = {
    bg: theme.colors.background[5],
    padding: [theme.spacing.extratight, theme.spacing.tight],
    highlight: [
      theme.colors.background[5].lighten(0.2),
      theme.colors.background[5].fade(0.1),
    ],
  };

  const goldButton = {
    bg: theme.colors.gold,
    fg: theme.colors.background[1],
    padding: [theme.spacing.extratight, theme.spacing.tight],
    highlight: [theme.colors.gold.lighten(0.1), theme.colors.gold.fade(0.1)],
  };

  const gearButton = {
    rounded: theme.border.radius.full,
    highlight: theme.colors.background[5],
    padding: theme.spacing.tight,
  };

  const signinProps = {
    tab: "signup",
    active: signup.active,
    onExit: signup.deactivate,
  };

  const menuProps = {
    active: settings.active,
    w: "25rem",
    placement: "bottom-end",
    onExit: settings.deactivate,
  };

  return (
    <>
      <Flex.Item margin={[theme.spacing.none, theme.spacing.extratight]}>
        <Button onClick={signup.activate} {...goldButton}>
          Sign In
        </Button>
        <SignIn {...signinProps} />
      </Flex.Item>
      <Flex.Item paddingRight={theme.spacing.tight}>
        <Button ref={settings.ref} onClick={settings.toggle} {...gearButton}>
          <Icon src={Gear} w={theme.icon.basesmall} />
        </Button>
        <Menu for={settings.ref} {...menuProps}>
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
        </Menu>
      </Flex.Item>
    </>
  );
}
