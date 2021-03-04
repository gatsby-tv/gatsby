import React from "react";
import { signIn } from "next-auth/client";
import {
  Box,
  Button,
  Card,
  Flex,
  Form,
  FormField,
  Fireworks,
  Icon,
  Modal,
  ModalProps,
  Rule,
  TextDisplay,
} from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";
import { GatsbyPlain, Github, Google, Email } from "@gatsby-tv/icons";

export interface SignInProps extends Omit<ModalProps, "fullscreen" | "zIndex"> {
  tab?: string;
}

export function SignIn(props: SignInProps): React.ReactElement {
  const theme = useTheme();

  const googleButtonProps = {
    w: 0.7,
    font: "large",
    bg: theme.colors.background[5],
    padding: theme.spacing[1],
    highlight: [
      theme.colors.background[5].lighten(0.2),
      theme.colors.background[5].fade(0.1),
    ],
  };

  const githubButtonProps = {
    ...googleButtonProps,
    tooltip: "For Contributors!",
  };

  const cardProps = {
    w: "42rem",
    bg: theme.colors.background[2],
    padding: theme.spacing[3],
  };

  const titleProps = {
    center: true,
    gap: theme.spacing[1.5],
    marginBottom: theme.spacing[1.5],
    align: "center",
  };

  const firstRuleProps = {
    bg: theme.colors.background[4],
    margin: ["-2px", theme.spacing[0], theme.spacing[2]],
  };

  const secondRuleProps = {
    ...firstRuleProps,
    margin: [theme.spacing[1.5], theme.spacing[0]],
  };

  const emailProps = {
    id: "email",
    name: "email",
    label: "Email",
    labelHidden: true,
    placeholder: "Email",
    font: theme.font[4],
    prefix: <Icon src={Email} w={theme.icon.smaller} />,
    spellCheck: false,
    autoComplete: true,
  };

  const submitButtonProps = {
    w: 1,
    font: theme.font[4],
    bg: theme.colors.gold,
    fg: theme.colors.background[1],
    padding: theme.spacing[0.5],
    highlight: [theme.colors.gold.lighten(0.1), theme.colors.gold.fade(0.1)],
  };

  const TitleMarkup = (
    <Flex as="span" {...titleProps}>
      <Icon src={GatsbyPlain} w={theme.icon.largest} />
      <TextDisplay size="small">Sign In to Gatsby</TextDisplay>
    </Flex>
  );

  const GoogleMarkup = (
    <Button onClick={() => signIn("google")} {...googleButtonProps}>
      <Flex center gap={theme.spacing[1]}>
        <Icon src={Google} w={theme.icon.base} />
        Sign In with Google
      </Flex>
    </Button>
  );

  const GithubMarkup = (
    <Button onClick={() => signIn("github")} {...githubButtonProps}>
      <Flex center gap={theme.spacing[1]}>
        <Icon src={Github} w={theme.icon.base} />
        Sign In with Github
      </Flex>
    </Button>
  );

  const EmailMarkup = (
    <Form method="post" action="/api/auth/signin/email">
      <Box marginBottom={theme.spacing[2]}>
        <FormField type="text" {...emailProps} />
      </Box>
      <Button
        type="submit"
        onClick={() => signIn("credentials")}
        {...submitButtonProps}
      >
        Sign In
      </Button>
    </Form>
  );

  return (
    <Modal fullscreen zIndex={100} {...props}>
      <Card {...cardProps}>
        {TitleMarkup}
        <Rule {...firstRuleProps} />
        <Flex column center gap={theme.spacing[1]}>
          {GoogleMarkup}
          {GithubMarkup}
        </Flex>
        <Rule {...secondRuleProps}>Or</Rule>
        {EmailMarkup}
      </Card>
      <Fireworks infinite zIndex={50} />
    </Modal>
  );
}
