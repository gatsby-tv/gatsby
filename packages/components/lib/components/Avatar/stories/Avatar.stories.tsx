import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Avatar, AvatarProps } from "@lib/components/Avatar";
import styles from "./Avatar.stories.scss";

export default {
  title: "Avatar",
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (props) => <Avatar {...props} />;

export const Small = Template.bind({});
Small.args = {
  src: "https://loremflickr.com/150/150",
  size: "smaller",
  "aria-label": "Small avatar",
};

export const SmallWithOverlay = Template.bind({});
SmallWithOverlay.args = {
  src: "https://loremflickr.com/150/150",
  overlay: <div className={styles.Overlay} />,
  size: "smaller",
  "aria-label": "Small avatar",
};

export const SmallSkeleton = Template.bind({});
SmallSkeleton.args = {
  size: "smaller",
  "aria-label": "Small avatar",
};

export const Medium = Template.bind({});
Medium.args = {
  src: "https://loremflickr.com/150/150",
  "aria-label": "Medium avatar",
};

export const MediumWithOverlay = Template.bind({});
MediumWithOverlay.args = {
  src: "https://loremflickr.com/150/150",
  overlay: <div className={styles.Overlay} />,
  "aria-label": "Medium avatar",
};

export const MediumSkeleton = Template.bind({});
MediumSkeleton.args = {
  "aria-label": "Medium avatar",
};

export const Large = Template.bind({});
Large.args = {
  src: "https://loremflickr.com/150/150",
  size: "larger",
  "aria-label": "Large avatar",
};

export const LargeWithOverlay = Template.bind({});
LargeWithOverlay.args = {
  src: "https://loremflickr.com/150/150",
  overlay: <div className={styles.Overlay} />,
  size: "larger",
  "aria-label": "Large avatar",
};

export const LargeSkeleton = Template.bind({});
LargeSkeleton.args = {
  size: "larger",
  "aria-label": "Large avatar",
};
