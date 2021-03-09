import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Desktop, DesktopProps } from "./Desktop";

export default {
  title: "Desktop",
  component: Desktop,
} as Meta;

const Template: Story<DesktopProps> = (args) => (<Desktop {...args} />);

export const Blank = Template.bind({});
Blank.args = {
  src: "",
  loop: true,
  muted: true,
  autoPlay: true,
};

export const DefaultAspectRatio = Template.bind({});
DefaultAspectRatio.args = {
  src:
    "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps_1920x1080_8000k.mp4",
  loop: true,
  muted: true,
  autoPlay: true,
};

export const WideAspectRatio = Template.bind({});
WideAspectRatio.args = {
  src:
    "https://upload.wikimedia.org/wikipedia/commons/a/a5/Spring_-_Blender_Open_Movie.webm",
  loop: true,
  muted: true,
  autoPlay: true,
};
