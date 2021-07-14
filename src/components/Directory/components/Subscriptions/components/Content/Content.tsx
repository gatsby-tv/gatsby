import React from 'react';
import { User } from '@gatsby-tv/content';
import { User as UserType } from '@gatsby-tv/types';

import { Link } from '@src/components/Link';

export interface ContentProps {
  user?: UserType;
  label: string;
}

export function Content(props: ContentProps): React.ReactElement {
  const { user, label } = props;

  return (
    <User.Subscriptions
      id="subscriptions"
      user={user}
      avatar="small"
      link={Link.Content}
      aria-labelledby={label}
    />
  );
}
