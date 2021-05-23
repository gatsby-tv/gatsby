import React from 'react';
import { useSession } from 'next-auth/client';
import { TextDisplay } from '@gatsby-tv/components';
import { User } from '@gatsby-tv/content';
import { useUniqueId } from '@gatsby-tv/utilities';
import { User as UserType } from '@gatsby-tv/types';

import { PageBody } from '@src/components/PageBody';

import styles from '@src/styles/Subscriptions.module.scss';

export default function SubscriptionsPage(): React.ReactElement {
  const [session] = useSession();
  const label = useUniqueId('heading');

  return (
    <PageBody>
      <TextDisplay id={label} className={styles.Heading} size="large">
        Subscriptions
      </TextDisplay>
      <User.Subscriptions
        id="subscriptions"
        user={session?.user as UserType | undefined}
        avatar="small"
        aria-labelledby={label}
      />
    </PageBody>
  );
}
