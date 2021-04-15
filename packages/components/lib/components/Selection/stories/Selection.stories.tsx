import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { classNames, useSelect } from "@gatsby-tv/utilities";

import { TextBox } from "@lib/components/TextBox";
import { Selection, SelectionProps } from "@lib/components/Selection";

import styles from "./Selection.stories.scss";

export default {
  title: "Selection",
  component: Selection,
} as Meta;

export const OneSection: Story<SelectionProps> = () => {
  const items = ["one", "two", "three"];
  const [selection, select] = useSelect(items, "one");

  return (
    <div className={styles.Selection}>
      <Selection
        itemClass={styles.Item}
        scrollHidden
        selection={selection}
        onSelect={select}
      >
        <Selection.Section>
          <Selection.Item option="one">
            <TextBox>One</TextBox>
          </Selection.Item>
          <Selection.Item option="two">
            <TextBox>Two</TextBox>
          </Selection.Item>
          <Selection.Item option="three">
            <TextBox>Three</TextBox>
          </Selection.Item>
        </Selection.Section>
      </Selection>
    </div>
  );
};

export const MultipleSections: Story<SelectionProps> = () => {
  const items = ["one", "two", "three", "four", "five"];
  const [selection, select] = useSelect(items, "one");

  return (
    <div className={styles.Selection}>
      <Selection
        itemClass={styles.Item}
        scrollHidden
        selection={selection}
        onSelect={select}
      >
        <Selection.Section title="first">
          <Selection.Item option="one">
            <TextBox>One</TextBox>
          </Selection.Item>
          <Selection.Item option="two">
            <TextBox>Two</TextBox>
          </Selection.Item>
          <Selection.Item option="three">
            <TextBox>Three</TextBox>
          </Selection.Item>
        </Selection.Section>
        <Selection.Section title="second">
          <Selection.Item option="four">
            <TextBox>Four</TextBox>
          </Selection.Item>
          <Selection.Item option="five">
            <TextBox>Five</TextBox>
          </Selection.Item>
        </Selection.Section>
      </Selection>
    </div>
  );
};

export const Row: Story<SelectionProps> = () => {
  const items = ["one", "two", "three"];
  const [selection, select] = useSelect(items, "one");

  return (
    <div className={classNames(styles.Selection, styles.Wide)}>
      <Selection
        itemClass={styles.Item}
        row
        selection={selection}
        onSelect={select}
      >
        <Selection.Item option="one">
          <TextBox>One</TextBox>
        </Selection.Item>
        <Selection.Item option="two">
          <TextBox>Two</TextBox>
        </Selection.Item>
        <Selection.Item option="three">
          <TextBox>Three</TextBox>
        </Selection.Item>
      </Selection>
    </div>
  );
};
