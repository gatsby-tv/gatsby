import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  Gatsby,
  Play,
  Pause,
  SkipBackward,
  SkipForward,
  Expand,
  Compress,
  Exclamation,
  Spinner,
} from "@gatsby-tv/icons";

import { AppProvider } from "@lib/components/AppProvider";

import { Icon, IconProps } from "./Icon";

export default {
  title: "Icon",
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => (
  <AppProvider theme="dark">
    <Icon w="5rem" h="5rem" {...args} />
  </AppProvider>
);

export const GatsbyLogo = Template.bind({});
GatsbyLogo.args = {
  src: Gatsby,
  ariaLabel: "Gatsby Logo",
};

export const PlayIcon = Template.bind({});
PlayIcon.args = {
  src: Play,
  ariaLabel: "Play Icon",
};

export const PauseIcon = Template.bind({});
PauseIcon.args = {
  src: Pause,
  ariaLabel: "Pause Icon",
};

export const ExpandIcon = Template.bind({});
ExpandIcon.args = {
  src: Expand,
  ariaLabel: "Expand Icon",
};

export const CompressIcon = Template.bind({});
CompressIcon.args = {
  src: Compress,
  ariaLabel: "Compress Icon",
};

export const SkipForwardIcon = Template.bind({});
SkipForwardIcon.args = {
  src: SkipForward,
  ariaLabel: "Skip Forward Icon",
};

export const SkipBackwardIcon = Template.bind({});
SkipBackwardIcon.args = {
  src: SkipBackward,
  ariaLabel: "Skip Backward Icon",
};

export const SpinnerIcon = Template.bind({});
SpinnerIcon.args = {
  src: Spinner,
  ariaLabel: "Spinner Icon",
};

export const ExclamationIcon = Template.bind({});
ExclamationIcon.args = {
  src: Exclamation,
  ariaLabel: "Exclamation Icon",
};
