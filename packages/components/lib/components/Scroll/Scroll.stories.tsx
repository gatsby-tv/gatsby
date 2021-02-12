import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LoremIpsum } from "react-lorem-ipsum";

import { AppProvider } from "@lib/components/AppProvider";
import { TextBox } from "@lib/components/TextBox";
import { Box } from "@lib/components/Box";

import { Scroll, ScrollProps } from "./Scroll";

export default {
  title: "Scroll",
  component: Scroll,
} as Meta;

const Template: Story<ScrollProps> = (args) => (
  <AppProvider theme="dark">
    <Box padding={"5rem"} h="20rem">
      <Scroll {...args}>
        <TextBox>
          <LoremIpsum p={7} />
        </TextBox>
      </Scroll>
    </Box>
  </AppProvider>
);

export const Vertical = Template.bind({});

export const Hidden = Template.bind({});
Hidden.args = {
  hide: true,
};
