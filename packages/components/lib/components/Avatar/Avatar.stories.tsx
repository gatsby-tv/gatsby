import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";

import { Avatar, AvatarProps } from "./Avatar";

const overlayMarkup = (
  <Box
    absolute
    bg="red"
    bottom={0}
    right={0}
    w="1.5rem"
    h="1.5rem"
    rounded={1}
  />
);

export default {
  title: "Avatar",
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => (
  <AppProvider theme="dark">
    <Avatar {...args} />
  </AppProvider>
);

export const Small = Template.bind({});
Small.args = {
  src: "https://loremflickr.com/150/150",
  ariaLabel: "Small avatar",
  size: "36px",
};

export const SmallWithOverlay = Template.bind({});
SmallWithOverlay.args = {
  src: "https://loremflickr.com/150/150",
  ariaLabel: "Small avatar",
  overlay: overlayMarkup,
  size: "36px",
};

export const SmallSkeleton = Template.bind({});
SmallSkeleton.args = {
  ariaLabel: "Small avatar",
  size: "36px",
};

export const Medium = Template.bind({});
Medium.args = {
  src: "https://loremflickr.com/150/150",
  ariaLabel: "Medium avatar",
  size: "44px",
};

export const MediumWithOverlay = Template.bind({});
MediumWithOverlay.args = {
  src: "https://loremflickr.com/150/150",
  ariaLabel: "Medium avatar",
  overlay: overlayMarkup,
  size: "44px",
};

export const MediumSkeleton = Template.bind({});
MediumSkeleton.args = {
  ariaLabel: "Medium avatar",
  size: "44px",
};

export const Large = Template.bind({});
Large.args = {
  src: "https://loremflickr.com/150/150",
  ariaLabel: "Large avatar",
  size: "60px",
};

export const LargeWithOverlay = Template.bind({});
LargeWithOverlay.args = {
  src: "https://loremflickr.com/150/150",
  ariaLabel: "Large avatar",
  overlay: overlayMarkup,
  size: "60px",
};

export const LargeSkeleton = Template.bind({});
LargeSkeleton.args = {
  ariaLabel: "Large avatar",
  size: "60px",
};
