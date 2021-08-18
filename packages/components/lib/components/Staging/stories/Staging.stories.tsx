import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Switch } from '@lib/components/Switch';
import { TextDisplay } from '@lib/components/TextDisplay';
import { Staging, StagingProps } from '@lib/components/Staging';

import styles from './Staging.stories.scss';

export default {
  title: 'Staging',
  component: Staging,
} as Meta;

export const TwoStages: Story<StagingProps> = (props) => {
  const [stage, setStage] = useState(0);
  return (
    <>
      <Switch
        className={styles.Switch}
        itemClass={styles.Option}
        selection={stage}
        onSelect={setStage}
      >
        <Switch.Item option={0}>One</Switch.Item>
        <Switch.Item option={1}>Two</Switch.Item>
      </Switch>
      <div className={styles.Container}>
        <Staging stage={stage}>
          <Staging.Stage className={styles.Stage} index={0}>
            <TextDisplay>One</TextDisplay>
          </Staging.Stage>
          <Staging.Stage className={styles.Stage} index={1}>
            <TextDisplay>Two</TextDisplay>
          </Staging.Stage>
        </Staging>
      </div>
    </>
  );
};

export const FiveStages: Story<StagingProps> = (props) => {
  const [stage, setStage] = useState(0);
  return (
    <>
      <Switch
        className={styles.Switch}
        itemClass={styles.Option}
        selection={stage}
        onSelect={setStage}
      >
        <Switch.Item option={0}>One</Switch.Item>
        <Switch.Item option={1}>Two</Switch.Item>
        <Switch.Item option={2}>Three</Switch.Item>
        <Switch.Item option={3}>Four</Switch.Item>
        <Switch.Item option={4}>Five</Switch.Item>
      </Switch>
      <div className={styles.Container}>
        <Staging stage={stage}>
          <Staging.Stage className={styles.Stage} index={0}>
            <TextDisplay>One</TextDisplay>
          </Staging.Stage>
          <Staging.Stage className={styles.Stage} index={1}>
            <TextDisplay>Two</TextDisplay>
          </Staging.Stage>
          <Staging.Stage className={styles.Stage} index={2}>
            <TextDisplay>Three</TextDisplay>
          </Staging.Stage>
          <Staging.Stage className={styles.Stage} index={3}>
            <TextDisplay>Four</TextDisplay>
          </Staging.Stage>
          <Staging.Stage className={styles.Stage} index={4}>
            <TextDisplay>Five</TextDisplay>
          </Staging.Stage>
        </Staging>
      </div>
    </>
  );
};
