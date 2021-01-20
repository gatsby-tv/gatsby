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
import { useTheme, useModal } from "@gatsby-tv/utilities";
import { GatsbyPlain, Github, Google, Email } from "@gatsby-tv/icons";

export interface SignInProps extends Omit<ModalProps, "fullscreen" | "zIndex"> {
  tab?: string;
}

export function SignIn(props: SignInProps): React.ReactElement {
  const theme = useTheme();

  const button = {
    w: 0.7,
    font: "large",
    bg: theme.colors.background[5],
    padding: theme.spacing.basetight,
    highlight: [
      theme.colors.background[5].lighten(0.2),
      theme.colors.background[5].fade(0.1),
    ],
  };

  const githubButton = {
    ...button,
    tooltip: "For Contributors!",
  };

  const goldButton = {
    w: 1,
    font: "base",
    bg: theme.colors.gold,
    fg: theme.colors.background[1],
    padding: theme.spacing.tight,
    highlight: [theme.colors.gold.lighten(0.1), theme.colors.gold.fade(0.1)],
  };

  const card = {
    w: "42rem",
    bg: theme.colors.background[2],
    padding: theme.spacing.loose,
  };

  const title = {
    center: true,
    gap: theme.spacing.base,
    marginBottom: theme.spacing.base,
    align: "center",
  };

  const firstRule = {
    bg: theme.colors.background[4],
    margin: ["-2px", theme.spacing.none, theme.spacing.baseloose],
  };

  const secondRule = {
    ...firstRule,
    margin: [theme.spacing.base, theme.spacing.none],
  };

  const emailProps = {
    type: "text",
    id: "email",
    name: "email",
    placeholder: "Email",
    prefix: <Icon src={Email} w={theme.icon.small} />,
    spellCheck: false,
    autoComplete: true,
  };

  return (
    <Modal fullscreen zIndex={100} {...props}>
      <Card {...card}>
        <Flex as="span" {...title}>
          <Icon src={GatsbyPlain} w={theme.icon.extralarge} />
          <TextDisplay font="small">Sign In to Gatsby</TextDisplay>
        </Flex>
        <Rule {...firstRule} />
        <Flex column center gap={theme.spacing.tight}>
          <Button onClick={() => signIn("google")} {...button}>
            <Flex gap={theme.spacing.base} align="center">
              <Icon src={Google} w={theme.icon.base} />
              Sign In with Google
            </Flex>
          </Button>
          <Button onClick={() => signIn("github")} {...githubButton}>
            <Flex gap={theme.spacing.base} align="center">
              <Icon src={Github} w={theme.icon.base} />
              Sign In with Github
            </Flex>
          </Button>
        </Flex>
        <Rule {...secondRule}>Or</Rule>
        <Form method="post" action="/api/auth/signin/email">
          <Box marginBottom={theme.spacing.baseloose}>
            <FormField {...emailProps} />
          </Box>
          <Button type="submit" {...goldButton}>
            Sign In
          </Button>
        </Form>
      </Card>
      <Fireworks infinite zIndex={50} />
    </Modal>
  );
}
