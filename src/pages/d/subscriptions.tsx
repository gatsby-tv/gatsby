import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUniqueId } from '@gatsby-tv/utilities';

import { Page } from '@src/components/Page';
import { Subscriptions } from '@src/components/Directory';
import { useSession } from '@src/utilities/session';

export default function SubscriptionsPage(): React.ReactElement {
  const [{ user }] = useSession();
  const router = useRouter();
  const label = useUniqueId('heading');
  
  useEffect(() => {
    if (!user) router.push('/');
  }, [user]);

  return (
    <Page title="Subscriptions">
      <Subscriptions.Layout>
        <Subscriptions.Heading id={label} />
        <Subscriptions.Content label={label} />
      </Subscriptions.Layout>
    </Page>
  );
}
