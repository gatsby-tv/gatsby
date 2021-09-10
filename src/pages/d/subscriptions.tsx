import { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useUniqueId } from '@gatsby-tv/utilities';

import { Page } from '@src/layout/Page';
import { Subscriptions } from '@src/layout/Subscriptions';
import { useSession } from '@src/services/session';

export default function SubscriptionsPage(): ReactElement {
  const { session } = useSession();
  const router = useRouter();
  const label = useUniqueId('heading');

  useEffect(() => {
    if (!session.user) router.push('/');
  }, [session.user]);

  return (
    <Page title="Subscriptions">
      <Subscriptions.Layout>
        <Subscriptions.Heading id={label} />
        <Subscriptions.Content label={label} user={session.user} />
      </Subscriptions.Layout>
    </Page>
  );
}
