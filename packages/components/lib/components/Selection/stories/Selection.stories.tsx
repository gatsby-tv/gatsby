import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Class } from '@gatsby-tv/utilities';

import { TextBox } from '@lib/components/TextBox';
import { Selection, SelectionProps } from '@lib/components/Selection';

import styles from './Selection.stories.scss';

export default {
  title: 'Selection',
  component: Selection,
} as Meta;

export const OneSection: Story<SelectionProps> = () => {
  const [selection, select] = useState('one');

  return (
    <div className={styles.Selection}>
      <Selection
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
  const [selection, select] = useState('one');

  return (
    <div className={styles.Selection}>
      <Selection
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
  const [selection, select] = useState('one');

  return (
    <div className={Class(styles.Selection, styles.Wide)}>
      <Selection
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
