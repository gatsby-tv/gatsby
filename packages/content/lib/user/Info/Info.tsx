import React from 'react';
import {
  Avatar,
  Icon,
  Optional,
  TextMeta,
  DiscreteSize,
} from '@gatsby-tv/components';
import { CheckmarkFill } from '@gatsby-tv/icons';
import { UserHandle, Value } from '@gatsby-tv/utilities';
import { User } from '@gatsby-tv/types';

import { LinkProps } from '@lib/types';

import { Skeleton } from './Info.skeleton';
import styles from './Info.scss';

export interface InfoProps {
  user?: User;
  blurb?: string | string[] | ((user: User) => string | string[]);
  avatar?: DiscreteSize;
  link?: React.FC<LinkProps>;
}

export function Info(props: InfoProps): React.ReactElement {
  const { user, avatar = 'base', link: Link } = props;

  if (!user) return <Skeleton />;

  const blurb =
    typeof props.blurb === 'function' ? props.blurb(user) : props.blurb;

  const VerifiedMarkup = user.verified ? (
    <Icon className={styles.Verified} src={CheckmarkFill} size="smallest" />
  ) : null;

  const BlurbMarkup = !blurb ? null : typeof blurb === 'string' ? (
    <TextMeta className={styles.InfoText}>{blurb}</TextMeta>
  ) : (
    <TextMeta.List className={styles.InfoText}>
      {blurb.map((item, index) => (
        <TextMeta key={`Info.Blurb.${index}`}>{item}</TextMeta>
      ))}
    </TextMeta.List>
  );

  return (
    <Optional component={Link} active={Boolean(Link)} $props={{ user }}>
      <div className={styles.Info}>
        <Avatar className={styles.Avatar} src={user.avatar} size={avatar} />
        <div className={styles.TextArea}>
          <Optional
            component="div"
            active={Boolean(VerifiedMarkup)}
            $props={{ className: styles.VerifiedContainer }}
          >
            <TextMeta className={styles.NameText}>{user.name}</TextMeta>
            {VerifiedMarkup}
          </Optional>
          <TextMeta className={styles.InfoText}>
            {UserHandle(user.handle)}
          </TextMeta>
          {BlurbMarkup}
        </div>
      </div>
    </Optional>
  );
}
