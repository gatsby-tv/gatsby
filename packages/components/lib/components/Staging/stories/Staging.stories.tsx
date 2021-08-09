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

export const Example: Story<StagingProps> = (props) => {
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
