import { Story, Meta } from '@storybook/react/types-6-0';
import { LoremIpsum } from 'react-lorem-ipsum';
import { useController } from '@gatsby-tv/utilities';

import { Scroll } from '@lib/components/Scroll';
import { TextBox } from '@lib/components/TextBox';
import { Button } from '@lib/components/Button';
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
        draggable
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

export const UsingScrollableContainer: Story<PanelProps> = (props) => {
  const { direction } = props;

  const { active, activate, deactivate } = useController();

  return (
    <div className={styles.Container}>
      <Button onClick={activate}>Activate</Button>
      <Panel
        className={styles.Panel}
        draggable
        active={active}
        direction={direction}
        onExit={deactivate}
      >
        <Scroll>
          <TextBox>
            <LoremIpsum p={7} />
          </TextBox>
        </Scroll>
      </Panel>
    </div>
  );
};

UsingScrollableContainer.args = {
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
        draggable
        direction={direction}
        active={active}
        onExit={deactivate}
      >
        {direction}
      </Panel>
    </>
  );
};

AsModal.args = {
  direction: 'right',
};
