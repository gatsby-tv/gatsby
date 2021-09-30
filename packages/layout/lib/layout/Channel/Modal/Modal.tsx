import { FC, ReactElement } from 'react';
import {
  Button,
  Modal as ModalComponent,
  Panel as PanelComponent,
} from '@gatsby-tv/components';
import { Cancel } from '@gatsby-tv/icons';
import { useMobileDetector } from '@gatsby-tv/utilities';
import { Channel } from '@gatsby-tv/types';

import { LinkProps } from '@lib/types';

import { Content } from './components/Content';

import styles from './Modal.scss';

export interface ModalProps {
  channel?: Channel;
  active?: boolean;
  link?: FC<LinkProps>;
  onExit?: () => void;
}

export function Modal(props: ModalProps): ReactElement {
  const { channel, active, link, onExit } = props;

  const isMobile = useMobileDetector();

  const Container = isMobile ? PanelComponent : ModalComponent;

  return (
    <Container
      className={isMobile ? styles.Panel : styles.Modal}
      overlay
      active={active}
      onExit={onExit}
    >
      <Button
        className={styles.Cancel}
        animate
        icon={Cancel}
        size="smaller"
        onClick={onExit}
      />
      <Content active={active} channel={channel} link={link} />
    </Container>
  );
}
