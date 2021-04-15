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

import { Icon, IconProps } from "@lib/components/Icon";

import styles from "./Icon.stories.scss";

export default {
  title: "Icon",
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (props) => (
  <Icon size="largest" {...props} />
);

export const GatsbyLogo = Template.bind({});
GatsbyLogo.args = {
  src: Gatsby,
  "aria-label": "Gatsby Logo",
};

export const PlayIcon = Template.bind({});
PlayIcon.args = {
  src: Play,
  "aria-label": "Play Icon",
};

export const PauseIcon = Template.bind({});
PauseIcon.args = {
  src: Pause,
  "aria-label": "Pause Icon",
};

export const ExpandIcon = Template.bind({});
ExpandIcon.args = {
  src: Expand,
  "aria-label": "Expand Icon",
};

export const CompressIcon = Template.bind({});
CompressIcon.args = {
  src: Compress,
  "aria-label": "Compress Icon",
};

export const SkipForwardIcon = Template.bind({});
SkipForwardIcon.args = {
  src: SkipForward,
  "aria-label": "Skip Forward Icon",
};

export const SkipBackwardIcon = Template.bind({});
SkipBackwardIcon.args = {
  src: SkipBackward,
  "aria-label": "Skip Backward Icon",
};

export const SpinnerIcon = Template.bind({});
SpinnerIcon.args = {
  src: Spinner,
  "aria-label": "Spinner Icon",
};

export const ExclamationIcon = Template.bind({});
ExclamationIcon.args = {
  src: Exclamation,
  "aria-label": "Exclamation Icon",
};
