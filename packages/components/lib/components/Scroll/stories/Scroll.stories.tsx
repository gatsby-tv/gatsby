import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LoremIpsum } from "react-lorem-ipsum";

import { TextBox } from "@lib/components/TextBox";
import { Scroll, ScrollProps } from "@lib/components/Scroll";

import styles from "./Scroll.stories.scss";

export default {
  title: "Scroll",
  component: Scroll,
} as Meta;

const Template: Story<ScrollProps> = (props) => (
  <Scroll className={styles.Container} {...props}>
    <TextBox>
      <LoremIpsum p={7} />
    </TextBox>
  </Scroll>
);

export const Vertical = Template.bind({});

export const Hidden = Template.bind({});
Hidden.args = {
  hide: true,
};
