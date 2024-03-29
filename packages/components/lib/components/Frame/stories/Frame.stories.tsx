import { Story, Meta } from '@storybook/react/types-6-0';

import { Image } from '@lib/components/Image';
import { Frame, FrameProps } from '@lib/components/Frame';

import styles from './Frame.stories.scss';

export default {
  title: 'Frame',
  component: Frame,
} as Meta;

export const Example: Story<FrameProps> = (props) => (
  <Frame
    topbar={<div className={styles.Topbar} />}
    sidebar={<div className={styles.Sidebar} />}
    {...props}
  >
    <div className={styles.Content}>
      {[...Array(24)].map((_, index) => (
        <Image key={index} aspectRatio="16 / 9" />
      ))}
    </div>
  </Frame>
);

Example.args = {
  flipped: false,
};
