import { Story, Meta } from '@storybook/react/types-6-0';
import { LoremIpsum } from 'react-lorem-ipsum';
import { useModal } from '@gatsby-tv/utilities';

import { Card } from '@lib/components/Card';
import { TextHeading } from '@lib/components/TextHeading';
import { TextBox } from '@lib/components/TextBox';
import { Button } from '@lib/components/Button';
import { Scroll } from '@lib/components/Scroll';
import { Modal, ModalProps } from '@lib/components/Modal';

import styles from './Modal.stories.scss';

export default {
  title: 'Modal',
  component: Modal,
} as Meta;

export const Example: Story<ModalProps> = () => {
  const modal = useModal();

  return (
    <>
      <Button animate onClick={modal.activate}>
        ClickMe
      </Button>
      <Modal
        overlay
        className={styles.Card}
        active={modal.active}
        onExit={modal.deactivate}
      >
        <Scroll hide>
          <TextBox className={styles.Text}>
            <TextHeading>Example Modal</TextHeading>
            <LoremIpsum p={10} />
          </TextBox>
        </Scroll>
      </Modal>
    </>
  );
};
