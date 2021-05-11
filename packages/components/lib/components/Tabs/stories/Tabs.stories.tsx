import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Tabs, TabsProps } from "@lib/components/Tabs";

import styles from "./Tabs.stories.scss";

export default {
  title: "Tabs",
  component: Tabs,
} as Meta;

export const Example: Story<TabsProps> = () => {
  const [tab, setTab] = useState("one");

  return (
    <Tabs className={styles.Tabs} gap="loose" selection={tab} onSelect={setTab}>
      <Tabs.Item option="one">One</Tabs.Item>
      <Tabs.Item option="two">Two</Tabs.Item>
      <Tabs.Item option="three">Three</Tabs.Item>
    </Tabs>
  );
};
