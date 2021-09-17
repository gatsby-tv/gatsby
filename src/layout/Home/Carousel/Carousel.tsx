import { ReactElement } from 'react';
import { Rule } from '@gatsby-tv/components';
import { Decoration } from '@gatsby-tv/layout';

import { useChannelModal } from '@src/utilities/channel-modal';

import styles from './Carousel.module.scss';

export function Carousel(): ReactElement {
  const [, setChannel] = useChannelModal();

  return (
    <>
      <Decoration.FeaturedChannels onSelect={setChannel} />
      <Rule className={styles.Rule} />
    </>
  );
}
