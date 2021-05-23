import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useModal } from '@gatsby-tv/utilities';

import { Button } from '@lib/components/Button';
import { TextBox } from '@lib/components/TextBox';
import { Selection } from '@lib/components/Selection';
import { Panel, PanelProps } from '@lib/components/Panel';

import styles from './Panel.stories.scss';

export default {
  title: 'Panel',
  component: Panel,
} as Meta;

export const InsideContainer: Story<PanelProps> = () => {
  const [selection, setSelection] = useState<string | undefined>(undefined);
  const [direction, setDirection] = useState<string | undefined>();

  useEffect(() => {
    if (selection) {
      setDirection(selection);
    } else {
      const id = setTimeout(() => setDirection(undefined), 300);
      return () => clearTimeout(id);
    }
  }, [selection]);

  return (
    <div className={styles.Selection}>
      <Selection
        itemClass={styles.Item}
        scrollHidden
        selection={selection}
        onSelect={setSelection}
      >
        <Selection.Item option="top">
          <TextBox>Top</TextBox>
        </Selection.Item>
        <Selection.Item option="right">
          <TextBox>Right</TextBox>
        </Selection.Item>
        <Selection.Item option="bottom">
          <TextBox>Bottom</TextBox>
        </Selection.Item>
        <Selection.Item option="left">
          <TextBox>Left</TextBox>
        </Selection.Item>
      </Selection>
      <Panel
        className={styles.Panel}
        active={Boolean(direction)}
        direction={direction}
        onExit={setSelection}
      >
        {direction}
      </Panel>
    </div>
  );
};

export const AsModal: Story<PanelProps> = () => {
  const { active, activate, deactivate } = useModal();

  return (
    <>
      <Button onClick={activate}>Activate</Button>
      <Panel
        className={styles.Panel}
        overlay
        active={active}
        onExit={deactivate}
      >
        Active
      </Panel>
    </>
  );
};
