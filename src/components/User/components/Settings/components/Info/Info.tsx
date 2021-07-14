import React from 'react';
import { TextDisplay, TextMeta } from '@gatsby-tv/components';
import { UserHandle, FullValue, useFrame } from '@gatsby-tv/utilities';
import { User } from '@gatsby-tv/types';

import styles from './Info.module.scss';

export interface InfoProps {
  user: User;
}

export function Info(props: InfoProps): React.ReactElement {
  const { user } = props;
  const { screen } = useFrame();

  const tight = screen.width > 650 ? 'large' : 'medium';

  return (
    <div>
      <TextDisplay className={styles.Title} size={tight ? 'large' : 'medium'}>
        {user.name}
      </TextDisplay>
      <TextMeta.List className={styles.Subtitle}>
        <TextMeta>{UserHandle(user.handle)}</TextMeta>
        <TextMeta>{FullValue(user.followers, 'follower')}</TextMeta>
      </TextMeta.List>
    </div>
  );
}
