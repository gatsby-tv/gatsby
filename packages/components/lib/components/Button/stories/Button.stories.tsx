import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Pause } from "@gatsby-tv/icons";

import { Icon } from "@lib/components/Icon";
import { Button, ButtonProps } from "@lib/components/Button";

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (props) => <Button {...props} />;

export const TextButton = Template.bind({});
TextButton.args = {
  children: "ClickMe",
  animate: true,
  onClick: () => console.log("Click"),
};

export const IconButton = Template.bind({});
IconButton.args = {
  icon: Pause,
  animate: true,
  onClick: () => console.log("Click"),
};
