import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { TextBox } from "@lib/components/TextBox";
import { Switch, SwitchProps } from "@lib/components/Switch";

import styles from "./Switch.stories.scss";

export default {
  title: "Switch",
  component: Switch,
} as Meta;

export const TwoSettings: Story<SwitchProps> = () => {
  const items = ["one", "two"];
  const [selection, setSelection] = useState("one");

  return (
    <Switch
      className={styles.Switch}
      itemClass={styles.Item}
      selection={selection}
      onSelect={setSelection}
    >
      <Switch.Item option="one">
        <TextBox>One</TextBox>
      </Switch.Item>
      <Switch.Item option="two">
        <TextBox>Two</TextBox>
      </Switch.Item>
    </Switch>
  );
};

export const ThreeSettings: Story<SwitchProps> = () => {
  const items = ["one", "two", "three"];
  const [selection, setSelection] = useState("one");

  return (
    <Switch
      className={styles.Switch}
      itemClass={styles.Item}
      selection={selection}
      onSelect={setSelection}
    >
      <Switch.Item option="one">
        <TextBox>One</TextBox>
      </Switch.Item>
      <Switch.Item option="two">
        <TextBox>Two</TextBox>
      </Switch.Item>
      <Switch.Item option="three">
        <TextBox>Three</TextBox>
      </Switch.Item>
    </Switch>
  );
};
