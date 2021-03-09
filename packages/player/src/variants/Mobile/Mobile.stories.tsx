import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { AppProvider } from "@gatsby-tv/components";

import { PlayerProps } from "@src/types";

import { Mobile } from "./Mobile";

export default {
  title: "Mobile",
  component: Mobile,
} as Meta;

const Template: Story<PlayerProps> = (args) => (
  <AppProvider theme="dark">
    <Mobile {...args} />
  </AppProvider>
);

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
