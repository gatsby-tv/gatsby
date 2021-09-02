import { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useController } from '@gatsby-tv/utilities';

import { Button } from '@lib/components/Button';
import { TextBox } from '@lib/components/TextBox';
import { Panel, PanelProps } from '@lib/components/Panel';

import styles from './Panel.stories.scss';

export default {
  title: 'Panel',
  component: Panel,
} as Meta;

export const InsideContainer: Story<PanelProps> = (props) => {
  const { direction } = props;

  const { active, activate, deactivate } = useController();

  return (
    <div className={styles.Container}>
      <Button onClick={activate}>Activate</Button>
      <Panel
        className={styles.Panel}
        active={active}
        direction={direction}
        onExit={deactivate}
      >
        {direction}
      </Panel>
    </div>
  );
};

InsideContainer.args = {
  direction: 'right',
};

export const AsModal: Story<PanelProps> = (props) => {
  const { direction } = props;
  const { active, activate, deactivate } = useController();

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

AsModal.args = {
  direction: 'right',
};
