import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useSelect } from "@gatsby-tv/utilities";

import { Tabs, TabsProps } from "@lib/components/Tabs";

import styles from "./Tabs.stories.scss";

export default {
  title: "Tabs",
  component: Tabs,
} as Meta;

export const Example: Story<TabsProps> = () => {
  const [tab, setTab] = useSelect(["one", "two", "three"]);

  return (
    <Tabs className={styles.Tabs} gap="loose" selection={tab} onSelect={setTab}>
      <Tabs.Item option="one">One</Tabs.Item>
      <Tabs.Item option="two">Two</Tabs.Item>
      <Tabs.Item option="three">Three</Tabs.Item>
    </Tabs>
  );
};
