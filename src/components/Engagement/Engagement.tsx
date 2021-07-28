import React from 'react';
import { Button } from '@gatsby-tv/components';
import { IconSource } from '@gatsby-tv/components/dist/types';
import {
  Subscribe,
  Follow,
  Promote,
  Donate,
  Tip,
  Misc,
} from '@gatsby-tv/icons';

import styles from './Engagement.module.scss';

export type EngagementProps = {
  type: 'subscribe' | 'follow' | 'promote' | 'donate' | 'tip' | 'misc';
};

export function Engagement(props: EngagementProps): React.ReactElement {
  let icon: IconSource;
  let tooltip: string;

  switch (props.type) {
    case 'subscribe':
      icon = Subscribe;
      tooltip = 'Subscribe';
      break;

    case 'follow':
      icon = Follow;
      tooltip = 'Follow';
      break;

    case 'promote':
      icon = Promote;
      tooltip = 'Promote';
      break;

    case 'donate':
      icon = Donate;
      tooltip = 'Donate';
      break;

    case 'tip':
      icon = Tip;
      tooltip = 'Tip';
      break;

    case 'misc':
      icon = Misc;
      tooltip = 'Misc';
      break;
  }

  return (
    <Button
      className={styles.Button}
      animate
      icon={icon}
      size="base"
      tooltip={tooltip}
    />
  );
}
