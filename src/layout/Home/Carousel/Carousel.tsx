import { ReactElement } from 'react';
import { Rule } from '@gatsby-tv/components';
import { Channel } from '@gatsby-tv/content';

import { useChannelModal } from '@src/utilities/channel-modal';

import styles from './Carousel.module.scss';

export function Carousel(): ReactElement {
  const [, setChannel] = useChannelModal();

  return (
    <>
      <Channel.Carousel onSelect={setChannel} />
      <Rule className={styles.Rule} />
    </>
  );
}
