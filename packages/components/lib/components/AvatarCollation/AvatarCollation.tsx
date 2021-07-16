import React from 'react';
import { Class } from '@gatsby-tv/utilities';
import { IPFSContent } from '@gatsby-tv/types';

import { Spacing, DiscreteSize } from '@lib/types';
import { Avatar } from '@lib/components/Avatar';

import styles from './AvatarCollation.scss';

export interface AvatarCollationProps {
  avatars: (IPFSContent | string | undefined)[];
  size?: DiscreteSize;
  spacing?: Spacing;
}

export function AvatarCollation(
  props: AvatarCollationProps
): React.ReactElement {
  const { avatars, size, spacing } = props;
  avatars.reverse();

  const classes = Class(styles.AvatarCollation, styles[`Gap-${spacing}`]);

  const AvatarsMarkup = avatars.map((avatar, index) => (
    <Avatar
      key={`${JSON.stringify(avatar)}.${index}`}
      src={avatar}
      size={size}
    />
  ));

  return <div className={classes}>{AvatarsMarkup}</div>;
}
