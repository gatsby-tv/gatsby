import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { TextBox } from "@lib/components/TextBox";

import { TextCaption, TextCaptionProps } from "./TextCaption";

export default {
  title: "TextCaption",
  component: TextCaption,
} as Meta;

export const Example: Story<TextCaptionProps> = () => (
  <AppProvider theme="dark">
    <TextBox font="1.8rem">
      <p>Example Text</p>
      <TextCaption>With a caption</TextCaption>
    </TextBox>
  </AppProvider>
);
