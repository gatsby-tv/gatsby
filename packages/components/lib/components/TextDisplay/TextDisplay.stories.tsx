import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { TextBox } from "@lib/components/TextBox";

import { TextDisplay, TextDisplayProps } from "./TextDisplay";

export default {
  title: "TextDisplay",
  component: TextDisplay,
} as Meta;

export const Example: Story<TextDisplayProps> = () => (
  <AppProvider theme="dark">
    <TextBox>
      <TextDisplay size="large">Large Display Text</TextDisplay>
      <TextDisplay size="small">Small Display Text</TextDisplay>
    </TextBox>
  </AppProvider>
);
