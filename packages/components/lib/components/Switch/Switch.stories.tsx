import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useSelect } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { TextBox } from "@lib/components/TextBox";
import { cssTransition } from "@lib/styles/transition";

import { Switch, SwitchProps } from "./Switch";

export default {
  title: "Switch",
  component: Switch,
} as Meta;

const switchStyle = css`
  ${Switch.Item}[data-selected] {
    color: ${(props) => props.theme.colors.blue};
    background-color: ${(props) => props.theme.colors.background[3]};
  }

  ${Switch.Item} {
    background-color: ${(props) => props.theme.colors.background[4]};
    border-radius: ${(props) => props.theme.border.radius.small};
    padding: ${(props) => props.theme.spacing[0.5]}
      ${(props) => props.theme.spacing[1.5]};
    ${(props) => cssTransition("all", props.theme.duration.fastest, "ease")}
  }
`;

export const TwoSettings: Story<SwitchProps> = () => {
  const items = ["one", "two"];
  const [selection, setSelection] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box w="20rem">
        <Switch css={switchStyle} selection={selection} onSelect={setSelection}>
          <Switch.Item id="one">
            <TextBox>One</TextBox>
          </Switch.Item>
          <Switch.Item id="two">
            <TextBox>Two</TextBox>
          </Switch.Item>
        </Switch>
      </Box>
    </AppProvider>
  );
};

export const ThreeSettings: Story<SwitchProps> = () => {
  const items = ["one", "two", "three"];
  const [selection, setSelection] = useSelect(items, "one");

  return (
    <AppProvider theme="dark">
      <Box w="20rem">
        <Switch css={switchStyle} selection={selection} onSelect={setSelection}>
          <Switch.Item id="one">
            <TextBox>One</TextBox>
          </Switch.Item>
          <Switch.Item id="two">
            <TextBox>Two</TextBox>
          </Switch.Item>
          <Switch.Item id="three">
            <TextBox>Three</TextBox>
          </Switch.Item>
        </Switch>
      </Box>
    </AppProvider>
  );
};
