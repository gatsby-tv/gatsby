import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";

import {
  TextMeta,
  TextMetaProps,
  TextMetaListProps,
  TextMetaLinkProps,
} from "./TextMeta";

export default {
  title: "TextMeta",
  component: TextMeta,
} as Meta;

const Template: Story<TextMetaProps> = (args) => (
  <AppProvider theme="dark">
    <TextMeta {...args} />
  </AppProvider>
);

export const Small = Template.bind({});
Small.args = {
  children: "Meta Text Small",
  font: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  children: "Meta Text Medium",
  font: "medium",
};

export const Large = Template.bind({});
Large.args = {
  children: "Meta Text Large",
  font: "large",
};

export const Bold = Template.bind({});
Bold.args = {
  children: "Meta Text Bold",
  font: "large",
  bold: true,
};

export const Subdued = Template.bind({});
Subdued.args = {
  children: "Meta Text Subdued",
  font: "large",
  subdued: true,
};

export const Truncated = Template.bind({});
Truncated.args = {
  children: "The Art of Storytelling and The Legend of Chun Li",
  tooltip: true,
  clamp: 2,
  font: "large",
  bold: true,
};

const ListTemplate: Story<TextMetaListProps> = (args) => (
  <AppProvider theme="dark">
    <TextMeta.List {...args}>
      <TextMeta>First</TextMeta>
      <TextMeta>Second</TextMeta>
      <TextMeta>Third</TextMeta>
    </TextMeta.List>
  </AppProvider>
);

export const ListSmall = ListTemplate.bind({});
ListSmall.args = {
  font: "small",
};

export const ListMedium = ListTemplate.bind({});
ListMedium.args = {
  font: "medium",
};

export const ListLarge = ListTemplate.bind({});
ListLarge.args = {
  font: "large",
};

const LinkTemplate: Story<TextMetaLinkProps> = (args) => (
  <AppProvider theme="dark">
    <TextMeta.Link {...args}>Text Meta Link</TextMeta.Link>
  </AppProvider>
);

export const LinkSmall = LinkTemplate.bind({});
LinkSmall.args = {
  font: "small",
};

export const LinkMedium = LinkTemplate.bind({});
LinkMedium.args = {
  font: "medium",
};

export const LinkLarge = LinkTemplate.bind({});
LinkLarge.args = {
  font: "large",
};
