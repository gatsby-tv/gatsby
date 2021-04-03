import React from "react";
import { Button, Icon } from "@gatsby-tv/components";
import { User } from "@gatsby-tv/icons";
import { useTheme, useModal } from "@gatsby-tv/utilities";

import { SignIn } from "@src/components/SignIn";

export function SignedOut(): React.ReactElement {
  const theme = useTheme();
  const signin = useModal();

  const signInProps = {
    font: theme.font[5],
    bg: theme.colors.gold,
    fg: theme.colors.background[1],
    padding: [theme.spacing[0.5], theme.spacing[1]],
    highlight: [theme.colors.gold.lighten(0.1), theme.colors.gold.fade(0.1)],
    onClick: signin.activate,
  };

  const miscProps = {
    bg: theme.colors.placeholder,
    rounded: theme.border.radius.full,
    highlight: theme.colors.background[5].lighten(0.2),
    padding: "0.8rem",
  };

  const SignInMarkup = <Button {...signInProps}>Sign In</Button>;

  const MiscMarkup = (
    <Button {...miscProps}>
      <Icon src={User} fg={theme.colors.font.body.fade(0.2)} w={theme.icon.small} />
    </Button>
  );

  return (
    <>
      {SignInMarkup}
      {MiscMarkup}
      <SignIn active={signin.active} onExit={signin.deactivate} />
    </>
  );
}
