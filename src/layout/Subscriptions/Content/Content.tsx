import { ReactElement } from 'react';
import { Listing } from '@gatsby-tv/layout';
import { User } from '@gatsby-tv/types';

import { Link } from '@src/components/Link';

export interface ContentProps {
  user?: User;
  label: string;
}

export function Content(props: ContentProps): ReactElement {
  const { user, label } = props;

  return (
    <Listing.Subscriptions
      id="subscriptions"
      user={user}
      avatar="small"
      link={Link.Content}
      aria-labelledby={label}
    />
  );
}
