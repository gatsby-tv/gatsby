import React from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Form,
  FormField,
  Fireworks,
  Icon,
  ModalProps,
  TextDisplay,
} from "@gatsby-tv/components";
import { useTheme } from "@gatsby-tv/utilities";
import { GatsbyPlain } from "@gatsby-tv/icons";

export interface SignUpProps extends Omit<ModalProps, "fullscreen" | "zIndex"> {
  tab?: string;
}

export function SignUp(props: SignUpProps): React.ReactElement {
  const theme = useTheme();

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

  const emailProps = {
    id: "email",
    name: "email",
    label: "Email",
    labelHidden: true,
    placeholder: "Email",
    font: theme.font[4],
    spellCheck: false,
    autoComplete: true,
  };
  const channelNameProps = {
    id: "channel",
    name: "channel",
    label: "Channel Name",
    labelHidden: true,
    placeholder: "Channel Name",
    font: theme.font[4],
    spellCheck: false,
    autoComplete: false,
  };
  const displayNameProps = {
    id: "display",
    name: "display",
    label: "Display Name",
    labelHidden: true,
    placeholder: "Display Name",
    font: theme.font[4],
    spellCheck: false,
    autoComplete: false,
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
      <TextDisplay size="small">Sign Up for Gatsby</TextDisplay>
    </Flex>
  );

  const FormMarkup = (
    <Form method="post" action="/api/auth/signin/email">
      <Box marginBottom={theme.spacing[2]}>
        <FormField type="text" {...emailProps} />
      </Box>
      <Box marginBottom={theme.spacing[2]}>
        <FormField type="text" {...channelNameProps} />
      </Box>
      <Box marginBottom={theme.spacing[2]}>
        <FormField type="text" {...displayNameProps} />
      </Box>


      <Button
        type="submit"
        onClick={() => alert("This has not been set up yet.")}
        {...submitButtonProps}
      >
        Submit
      </Button>
    </Form>
  );

  return (
    <>
      <Flex>
        <Card {...cardProps}>
          {TitleMarkup}
          {FormMarkup}
        </Card>
      </Flex>
      <Fireworks infinite zIndex={50} />
    </>
  );
}
