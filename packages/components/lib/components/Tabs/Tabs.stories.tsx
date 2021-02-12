import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useSelect } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";

import { Tabs, TabsProps } from "./Tabs";

export default {
  title: "Tabs",
  component: Tabs,
} as Meta;

export const Example: Story<TabsProps> = () => {
  const [tab, setTab] = useSelect(["one", "two", "three"]);

  return (
    <AppProvider theme="dark">
      <Tabs
        font="large"
        w="25rem"
        h="32px"
        gap="20px"
        selection={tab}
        onSelect={setTab}
      >
        <Tabs.Item id="one">One</Tabs.Item>
        <Tabs.Item id="two">Two</Tabs.Item>
        <Tabs.Item id="three">Three</Tabs.Item>
      </Tabs>
    </AppProvider>
  );
};
