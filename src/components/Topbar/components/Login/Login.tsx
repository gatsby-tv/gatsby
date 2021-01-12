import React from "react";
import { Button, Flex, Icon, Menu } from "@gatsby-tv/components";
import { Gear } from "@gatsby-tv/icons";
import { useTheme, useMenu } from "@gatsby-tv/utilities";

export function Login(): React.ReactElement {
  const theme = useTheme();
  const settings = useMenu<HTMLButtonElement>();

  return (
    <>
      <Flex.Item>
        <Button
          bg={theme.colors.background[5]}
          padding={[theme.spacing.extraTight, theme.spacing.baseTight]}
          highlight={[
            theme.colors.background[5].lighten(0.2),
            theme.colors.background[5],
          ]}
        >
          Log In
        </Button>
      </Flex.Item>
      <Flex.Item margin={[theme.spacing.none, theme.spacing.extraTight]}>
        <Button
          bg={theme.colors.gold}
          fg={theme.colors.background[1]}
          padding={[theme.spacing.extraTight, theme.spacing.tight]}
          highlight={[
            theme.colors.gold.lighten(0.1),
            theme.colors.gold.fade(0.1),
          ]}
        >
          Sign Up
        </Button>
      </Flex.Item>
      <Flex.Item paddingRight={theme.spacing.tight}>
        <Button
          ref={settings.ref}
          rounded={theme.border.radius.full}
          highlight={theme.colors.background[5]}
          padding={theme.spacing.tight}
          onClick={settings.toggle}
        >
          <Icon src={Gear} w={theme.icon.baseSmall} />
        </Button>
        <Menu
          for={settings.ref}
          active={settings.active}
          placement="bottom-end"
          w="25rem"
          onExit={settings.deactivate}
        >
          <Menu.Item />
          <Menu.Item />
          <Menu.Item />
        </Menu>
      </Flex.Item>
    </>
  );
}
