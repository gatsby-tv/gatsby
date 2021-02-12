import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LoremIpsum } from "react-lorem-ipsum";

import { AppProvider } from "@lib/components/AppProvider";
import { TextHeading } from "@lib/components/TextHeading";
import { TextSubheading } from "@lib/components/TextSubheading";

import { TextBox, TextBoxProps } from "./TextBox";

export default {
  title: "TextBox",
  component: TextBox,
} as Meta;

const Template: Story<TextBoxProps> = (args) => (
  <AppProvider theme="dark">
    <TextBox {...args}>
      <TextHeading>Text Box Component</TextHeading>
      <TextSubheading>Example</TextSubheading>
      <LoremIpsum p={2} />
    </TextBox>
  </AppProvider>
);

export const Example = Template.bind({});
Example.args = {
  spacing: "1rem",
};
